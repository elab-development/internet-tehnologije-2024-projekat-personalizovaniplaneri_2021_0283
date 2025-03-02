<?php

namespace App\Http\Controllers;

use App\Http\Middleware\IsAdmin;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    public function __construct()
    {
        $this->middleware(IsAdmin::class)->only('create', 'update', 'delete');
    }
}

