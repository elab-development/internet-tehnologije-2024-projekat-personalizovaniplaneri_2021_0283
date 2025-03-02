<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AdminController extends Controller
{
    public function profile(Request $request)
    {
        // Koristi admin guard da dobiješ trenutnog admina
        $admin = Auth::guard('admin')->user();

        // Vraćanje podataka o adminu
        return response()->json($admin);
    }
    public function getUsers(Request $request)
{
    // Proveri da li je korisnik autentifikovan
    if (!$request->user()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    $users = User::all(); // ili filter koji ti treba
    return response()->json($users);
}
public function userProfile(Request $request)
{
    $user = Auth::user(); // Ovo dohvaća autentifikovanog korisnika (ne admina)
    
    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    return response()->json($user);
}


}

