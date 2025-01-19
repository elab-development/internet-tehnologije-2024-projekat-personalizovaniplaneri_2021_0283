<?php

namespace App\Http\Controllers;

use App\Models\Customization;
use App\Http\Resources\CustomizationCollection;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customizations = Customization::all();
        return new CustomizationCollection($customizations);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($customization_id)
    {
        $customization = Customization::find($customization_id);
        if(is_null($customization)){
            return response()->json('Data not found', 404);
        }
        return response()->json($customization);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customization $customization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customization $customization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customization $customization)
    {
        //
    }
}
