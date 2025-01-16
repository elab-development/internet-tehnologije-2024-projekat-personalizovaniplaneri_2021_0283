<?php
 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomizationController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\PlannerController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/greeting', function () {
    return 'Cao svima!';
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/customizations', [CustomizationController::class, 'index']);
Route::get('/customizations/{id}', [CustomizationController::class, 'show']);

Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);

Route::get('/planners', [PlannerController::class, 'index']);
Route::get('/planners/{id}', [PlannerController::class, 'show']);

Route::get('/types', [TypeController::class, 'index']);
Route::get('/types/{id}', [TypeController::class, 'show']);