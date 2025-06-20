<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;





Route::get('/', function (Request $request) {
    return Inertia::render('BillingApp/home' ,[
        'product' => $request->all(),
        'user' => auth()->user()
    ]);
})->name('billingapp.home')->middleware('get.product.info');

Route::get('/dashboard', function () {
    return Inertia::render('BillingApp/dashboard' , [
        'user' => auth()->user()
    ]);
})->name('billingapp.dashboard')->middleware('auth');

Route::get('/products', function () {
    return Inertia::render('BillingApp/product' , [
        'user' => auth()->user()
    ]);
})->name('billingapp.product')->middleware('auth');

