<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeUserController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\PlannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomizationController;
use App\Http\Controllers\PlannerCustomizationController;
use App\Http\Controllers\CategoryCustomizationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserOrderController;
use App\Http\Controllers\PlannerOrderController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('users', UserController::class);
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/type/{id}/users', [TypeUserController::class, 'index']);

Route::resource('types', TypeController::class);
Route::get('/types', [TypeController::class, 'index']);
Route::get('/types/{id}', [TypeController::class, 'show']);

Route::resource('planners', PlannerController::class);
Route::get('/planners', [PlannerController::class, 'index']);
Route::get('/planners/{id}', [PlannerController::class, 'show']);

Route::resource('categories', CategoryController::class);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::resource('customizations', CustomizationController::class);
Route::get('/customizations', [CustomizationController::class, 'index']);
Route::get('/customizations/{id}', [CustomizationController::class, 'show']);
Route::get('/planner/{id}/customizations', [PlannerCustomizationController::class, 'index']);
Route::get('/category/{id}/customizations', [CategoryCustomizationController::class, 'index']);

Route::resource('orders', OrderController::class);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::get('/user/{id}/orders', [UserOrderController::class, 'index']);
Route::get('/planner/{id}/orders', [PlannerOrderController::class, 'index']);


