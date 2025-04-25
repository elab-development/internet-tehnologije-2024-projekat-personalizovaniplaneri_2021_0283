<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return new UserCollection($users);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request->all());
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required',
            'sifra' => 'required|string|min:8',
            'datum_registracije' => 'sometimes|date',
            'type_id' => 'required|integer'
        ]);
 
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
 
        $user = User::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'sifra' => Hash::make($request->sifra),
            'datum_registracije' => $request->datum_registracije ?? null,
            'type_id' => $request->type_id ?? null,
            
        ]);
 
        return response()->json(['User created successfully.', new UserResource($user)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $user_id) 
    {  
        $user = User::find($user_id); 
        if (is_null($user)) { 
            return response()->json('Data not found', 404); 
 
        } 
        return response()->json($user); 
 
    } 

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
    \Log::info('Podaci koji dolaze u update:', $request->all());
    // Proveri da li korisnik postoji
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    \Log::info('ID korisnika koji se ažurira: ' . $user->id);

    // Validacija ulaznih podataka
    $validator = Validator::make($request->all(), [
        'ime' => 'sometimes|string|max:255',
        'prezime' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:user,email,' . $user->id, // Isključuje trenutnog korisnika iz provere za email duplikate
        'sifra' => 'sometimes|string',
        'datum_registracije' => 'sometimes|date',
        'type_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        \Log::info('Neuspesna validacija', ['errors' => $validator->errors()]);
        return response()->json($validator->errors(), 400);
    }

    // Ažuriraj korisnika sa novim podacima
    $user->ime = $request->ime ?? $user->ime;
    $user->prezime = $request->prezime ?? $user->prezime;
    $user->email = $request->email ?? $user->email;
    $user->sifra = $request->sifra ?? $user->sifra;
    $user->datum_registracije = $request->datum_registracije ?? $user->datum_registracije;
    $user->type_id = $request->type_id ?? $user->type_id;

    // Spasi promene
    $user->save();

    // Vratiti ažuriranog korisnika
    return response()->json(['message' => 'User is updated successfully.', 'user' => new UserResource($user)]);
}

    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    // Pronađi korisnika
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Obriši korisnika
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}


}
