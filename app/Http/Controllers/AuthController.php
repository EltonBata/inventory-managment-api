<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

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

            $token = $user->createToken("{$user->username}-token")->plainTextToken;

            return response()->json([
                'token' => $token
            ]);
        }

        return response()->json([
            'message' => __('auth.failed')
        ], 403);
    }
}
