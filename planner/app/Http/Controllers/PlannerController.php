<?php

namespace App\Http\Controllers;

use App\Models\Planner;
use App\Http\Resources\PlannerResource;
use Illuminate\Http\Request;
use App\Http\Resources\PlannerCollection;

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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planner $planner)
    {
        //
    }
}
