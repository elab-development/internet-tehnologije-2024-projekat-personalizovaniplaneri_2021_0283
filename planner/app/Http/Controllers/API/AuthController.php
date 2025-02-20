<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails())
            return response()->json($validator->errors());

        $user = User::create([
            'ime' => $request->name,
            'prezime' => $request->lastName,
            'email' => $request->email,
            'sifra' => Hash::make($request->password),
            'datum_registracije' => now(),
            'type_id'=> 1
        ]);

        $token = auth()->login($user);

        return response()
		->json(['data' => $user, 'access_token' => $token,'token_type' => 'Bearer',]);
    }
    public function login(Request $request)
    {/*
        if (!$token = auth()->attempt($request->only('email', 'sifra'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $user = auth()->user();
        */
        
       /* if(Auth::attempt($request->only('email', 'sifra'))) 
	    {
            return response()
                ->json([
                    'message' => 'Unauthorized',
                    'input' => $request->only('email', 'sifra'), // Provera unosa
                    'user' => User::where('email', $request->email)->first(), // Provera korisnika iz baze
                ], 401);
        }
/*
        return response()->json([
            'message' => 'Welcome ' . $user->ime,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => [
                'email' => $user->email,
                'type_id' => $user->type_id,
            ],
        ]);
        
        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Hi ' . $user->ime . ', welcome to home', 'access_token' => $token, 'token_type' => 					'Bearer',]);
    */
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // Ako je autentifikacija uspešna
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'message' => 'Welcome ' . $user->ime,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'email' => $user->email,
                'type_id' => $user->type_id,
            ],
        ]);
    }

    // Ako autentifikacija nije uspela
    return response()->json(['message' => 'Unauthorized'], 401);
}
public function loginAdmin(Request $request)
{
    \Log::info('Pokušaj prijave admina:', ['email' => $request->email]);

    $admin = User::where('email', $request['email'])->where('role', 'admin')->first();

    if (!$admin || !Hash::check($request['password'], $admin->sifra)) {
        \Log::warning('Admin nije pronađen ili lozinka nije tačna:', ['email' => $request->email]);
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    \Log::info('Admin uspešno pronađen:', ['email' => $admin->email, 'role' => $admin->role]);

    $token = $admin->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Hi ' . $admin->ime . ', welcome to admin home',
        'access_token' => $token,
        'token_type' => 'Bearer'
    ]);
}
}


