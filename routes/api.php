<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('throttle:6,1');




Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/auth/verify/{id}/{hash}', [AuthController::class, 'verify_email'])
        ->middleware('signed')
        ->name('verification.verify');

    Route::get('/auth/resend-verification-email', [AuthController::class, 'resend_verification_email'])
        ->middleware('throttle:6,1');
});
