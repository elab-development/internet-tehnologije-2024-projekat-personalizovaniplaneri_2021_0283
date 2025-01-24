<?php

namespace App\Http\Controllers;

use App\Models\Planner;
use App\Http\Resources\PlannerResource;
use Illuminate\Http\Request;
use App\Http\Resources\PlannerCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PlannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $planners = Planner::all();
        return new PlannerCollection($planners);
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
            'naziv' => 'required|string|max:255',
            'status' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $planner = Planner::create([
            'naziv' => $request->naziv,
            'status' => $request->status,
            'user_id' => Auth::user()->id, // Korisnik koji je kreirao planer
        ]);

        return response()->json(['message' => 'Planner created successfully.', 'data' => $planner], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Planner $planner)
    {
        return new PlannerResource($planner);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planner $planner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Planner $planner)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'sometimes|string|max:255',
            'status' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->has('naziv')) {
            $planner->naziv = $request->naziv;
        }

        if ($request->has('status')) {
            $planner->status = $request->status;
        }

        $planner->save();

        return response()->json(['message' => 'Planner updated successfully.', 'data' => $planner], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planner $planner)
    {
        $planner->delete();

        return response()->json(['message' => 'Planner deleted successfully.'], 200);
    }
}
