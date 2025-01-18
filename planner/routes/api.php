<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTestController;
use App\Http\Controllers\TypeUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('users', UserController::class);
Route::get('/users/{id}', [UserTestController::class, 'show']);
Route::get('/users', [UserTestController::class, 'index']);

Route::get('/type/{id}/users', [TypeUserController::class, 'index']);


