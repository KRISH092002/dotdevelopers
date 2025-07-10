<?php

use App\Http\Controllers\products\billingApp\BillingHomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;





Route::get('/', function (Request $request) {
    return Inertia::render('BillingApp/home', [
        'product' => $request->all(),
        'user' => auth()->user()
    ]);
})->name('billingapp.home')->middleware('get.product.info');

//Auth Group

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [BillingHomeController::class, 'openDashboard'])->name('billingapp.dashboard');

    Route::get('/invoices', function () {
        return Inertia::render('BillingApp/invoices', [
            'user' => auth()->user()
        ]);
    })->name('billingapp.invoices');

    Route::get('/store', function () {
        return Inertia::render('BillingApp/store', [
            'user' => auth()->user()
        ]);
    })->name('billingapp.store');

    Route::post('add/new/product', [BillingHomeController::class, 'addNewProduct'])->name('billingapp.add.new.product');
    Route::post('add/new/category', [BillingHomeController::class, 'addNewCategory'])->name('billingapp.add.new.category');
    Route::post('get/categories', [BillingHomeController::class, 'getCategory'])->name('billingapp.get.categories');
    Route::post('get/products', [BillingHomeController::class, 'getProducts'])->name('billingapp.get.products');
    Route::post('get/clients', [BillingHomeController::class, 'getClients'])->name('billingapp.get.clients');
    Route::post('add/new/client', [BillingHomeController::class, 'addNewClient'])->name('billingapp.add.new.client');

    Route::post('add/new/invoice', [BillingHomeController::class, 'addNewInvoice'])->name('billingapp.add.new.invoice');

    Route::post('get/invoices', [BillingHomeController::class, 'getInvoices'])->name('billingapp.get.invoices');

    Route::get('preview/invoice/{id}' , [BillingHomeController::class , 'previewInvoice'])->name('billingapp.preview.invoice');
});
