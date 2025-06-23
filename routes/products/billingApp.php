<?php

use App\Http\Controllers\products\billingApp\BillingHomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;





Route::get('/', function (Request $request) {
    return Inertia::render('BillingApp/home' ,[
        'product' => $request->all(),
        'user' => auth()->user()
    ]);
})->name('billingapp.home')->middleware('get.product.info');

//Auth Group

Route::middleware('auth')->group(function(){

    Route::get('/dashboard', function () {
        return Inertia::render('BillingApp/dashboard' , [
            'user' => auth()->user()
        ]);
    })->name('billingapp.dashboard');
    
    Route::get('/products', function () {
        return Inertia::render('BillingApp/product' , [
            'user' => auth()->user()
        ]);
    })->name('billingapp.product');

    Route::get('/store', function () {
        return Inertia::render('BillingApp/store' , [
            'user' => auth()->user()
        ]);
    })->name('billingapp.store');
    
    Route::post('add/new/product' ,[BillingHomeController::class, 'addNewProduct'])->name('billingapp.add.new.product');
    Route::post('add/new/category' ,[BillingHomeController::class, 'addNewCategory'])->name('billingapp.add.new.category');
    Route::post('get/categories' ,[BillingHomeController::class, 'getCategory'])->name('billingapp.get.categories');
    Route::post('get/products' ,[BillingHomeController::class, 'getProducts'])->name('billingapp.get.products');
    
});
