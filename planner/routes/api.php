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
use App\Http\Controllers\API\AuthController;
use App\Http\middleware\IsAdmin;
use App\Http\Controllers\API\AdminController;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::resource('planner', PlannerController::class)->only(['update','store','destroy']);


    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});
 Route::group(['middleware' => ['auth:admin-api']], function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Welcome to admin dashboard']);
    });
});

Route::post('/admin/login', [AuthController::class, 'loginAdmin']);

Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    Route::post('/create-user', [UserController::class, 'create']);
    Route::put('/update-user/{user}', [UserController::class, 'update']);
    Route::delete('/destroy-user/{id}', [UserController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/admin/profile', [AdminController::class, 'profile']);
Route::middleware('auth:sanctum')->get('/profile', [AdminController::class, 'userProfile']);
Route::middleware('auth:sanctum')->get('/admin/user', [AdminController::class, 'getUsers']);



