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
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required',
            'sifra' => 'required',
            'datum_registracije' => 'required',
            'type_id' => 'required'
        ]);
 
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
 
        $user = User::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'sifra' => $request->sifra,
            'datum_registracije' => $request->datum_registracije,
            'type_id' => $request->type_id,
        ]);
 
        return response()->json(['User created successfully.', new UserResource($user)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
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
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required',
            'sifra' => 'required',
            'datum_registracije' => 'required',
            'type_id' => 'required'
        ]);
 
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user->ime = $request->ime;
        $user->prezime = $request->prezime;
        $user->email = $request->email;
        $user->sifra = $request->sifra;
        $user->datum_registracije = $request->datum_registracije;
        $user->type_id = $request->type_id;
        $user->save();
 
        return response()->json(['Pser is updated successfully.', new UserResource($user)]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json('User deleted successfully');

    }
}
