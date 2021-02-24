<?php

use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\TypeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('homepage');
});

Route::resources([
    'products' => ProductController::class,
    'product/types' => TypeController::class,
    'product/categories' => CategoryController::class
]);