<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Roles;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        $request->validate([
            'email' => ['required', 'email:filter'],
            'password' => ['required', Password::defaults()]
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {

            $user = Auth::user();

            //generate token
            $token = $user->createToken("{$user->username}-token")->plainTextToken;

            Log::channel('daily')->info('User authenticated', ['user' => $user->user_id]);

            return response()->json([
                'token' => $token
            ]);
        }

        Log::channel('daily')->error('Authentication failed', ['user_ip_address' => $request->ip()]);

        return response()->json([
            'message' => __('auth.failed')
        ], 403);
    }

    public function register(Request $request)
    {
        try {

            DB::beginTransaction();

            $fields = [
                'email' => ['required', 'email:filter', Rule::unique(User::class, 'email')],
                'password' => ['required', Password::defaults(), 'confirmed'],
                'username' => ['required', 'string', Rule::unique(User::class, 'username')],
                'roles' => ['required', 'array'],
                'roles.*' => ['uuid', Rule::exists(Roles::class, 'role_id')]
            ];

            //get roles according to given ids
            $roles = Roles::whereIn('role_id', $request->roles)->select('role_name')->get();

            //add more validations
            foreach ($roles as $role) {

                //if user is customer add respective fields for validation
                if ($role->role_name === RoleEnum::CUSTOMER->value) {
                    $fields = array_merge($fields, [
                        'customer_name' => ['required', 'string'],
                        'customer_address' => ['required', 'string'],
                    ]);
                }

                //if user is provider add respective fields for validation
                if ($role->role_name === RoleEnum::PROVIDER->value) {
                    $fields = array_merge($fields, [
                        'provider_name' => ['required', 'string'],
                        'provider_address' => ['required', 'string'],
                    ]);
                }
            }


            $request->validate($fields);

            $user = User::create($request->all());

            //verify if customer`s data are set in 
            if ($request->customer_name) {
                $user->customer()->create($request->only('customer_name', 'customer_address'));
            }

            //verify if provider`s data are set in 
            if ($request->provider_name) {
                $user->provider()->create($request->only('provider_name', 'provider_address'));
            }

            //create roles
            $user->roles()->attach($request->roles);


            //send verification email
            event(new Registered($user));

            Log::channel('daily')->info('Email-verification sent', ['user' => $user->user_id]);

            DB::commit();

            Log::channel('daily')->info('User created', ['user' => $user->user_id]);

            return response()->json([
                'message' => __('message.registered', ['item' => __('User')])
            ], 201);
        } catch (\Exception $e) {

            DB::rollBack();

            Log::channel('daily')->error('Failed to create user', ['user_ip_address' => $request->ip(), 'error' => $e->getMessage()]);

            $message = __('message.failed_register', ['item' => strtolower(__('User'))]);

            //if the exception is from validator return a json with 422 code, otherwise with 500
            if ($e instanceof ValidationException) {
                return response()->json([
                    'message' => $message,
                    'errors' => $e->errors()
                ], 422);
            }

            return response()->json([
                'message' => $message,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verify_email(EmailVerificationRequest $request)
    {
        try {

            $request->fulfill();

            Log::channel('daily')->info('Email verified', ['user' => $request->user()->user_id]);

            return response()->json([
                'message' => __('message.email_verified')
            ], 200);
        } catch (\Exception $e) {

            Log::channel('daily')->error('Failed to verify email', ['user' => $request->user()->user_id]);

            return response()->json([
                'message' => __('message.email_verify_failed'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function resend_verification_email(Request $request)
    {
        try {
            $request->user()->sendEmailVerificationNotification();

            Log::channel('daily')->info('Email verification resent', ['user' => $request->user()->user_id]);

            return response()->json([
                'message' => __('message.email_verification_resent')
            ], 200);
        } catch (\Exception $e) {

            Log::channel('daily')->error('Failed to resend verification email', ['user' => $request->user()->user_id]);

            return response()->json([
                'message' => __('message.email_verification_send_failed'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {

        $request->user()->currentAccessToken()->delete();

        Log::channel('daily')->info('User logged out', ['user' => $request->user()->user_id]);

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => __('message.loggedout')
        ], 200);
    }
}
