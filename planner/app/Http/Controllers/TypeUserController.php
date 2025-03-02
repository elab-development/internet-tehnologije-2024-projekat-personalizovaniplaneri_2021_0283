<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class TypeUserController extends Controller
{
    public function index($type_id)
    {
        $users = User::get()->where('type_id', $type_id);
        if (is_null($users))
            return response()->json('Data not found', 404);
        return response()->json($users);
    }

}
