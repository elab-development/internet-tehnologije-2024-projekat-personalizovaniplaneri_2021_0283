<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/greeting', function () {
    return 'Cao svima!';
});

Route::get('/users', [UserController::class, 'index']);