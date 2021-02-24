<?php

use App\Http\Controllers\Api\Product\CategoryController;
use App\Http\Controllers\Api\Product\TypeController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resources([
    'users' => UserController::class,
    'products' => ProductController::class,
    'product/types' => TypeController::class,
    'product/categories' => CategoryController::class
]);
