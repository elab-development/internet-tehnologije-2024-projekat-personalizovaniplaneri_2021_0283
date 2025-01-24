<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user',
            'sifra' => 'required|string|min:8'
        ]);
        if ($validator->fails())
            return response()->json($validator->errors());

        $user = User::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'sifra' => Hash::make($request->sifra),
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
        
        if(Auth::attempt($request->only('email', 'sifra'))) 
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
        */
        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Hi ' . $user->ime . ', welcome to home', 'access_token' => $token, 'token_type' => 					'Bearer',]);
    
    }

    /*public function loginAdmin(Request $request)
    {
        if (!Auth::guard('admin')->attempt($request->only('email',   'sifra'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $admin = Admin::where('email', $request['email'])->firstOrFail();

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Hi ' . $admin->ime . ', welcome to admin home', 'access_token' => $token, 'token_type' => 'Bearer']);
    }*/


}