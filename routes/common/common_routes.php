<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialLoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('common/auth');
})->name('component.auth');


Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/signup', [AuthController::class, 'signup'])->name('signup')->middleware('get.product.info');


Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::post('/check/email', [AuthController::class, 'emailCheck'])->name('emailCheck')->middleware('get.product.info');
Route::post('/check/user_name', [AuthController::class, 'userNameCheck'])->name('userNameCheck')->middleware('get.product.info');


Route::get('auth/google', [SocialLoginController::class, 'redirectToGoogle'])->name('login.google');
Route::get('auth/google/callback', [SocialLoginController::class, 'handleGoogleCallback']);

