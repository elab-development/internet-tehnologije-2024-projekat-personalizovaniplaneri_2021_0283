<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customization;

class PlannerCustomizationController extends Controller
{
    public function index($planner_id)
    {
        $customizations = Customization::get()->where('planner_id', $planner_id);
        if (is_null($customizations))
            return response()->json('Data not found', 404);
        return response()->json($customizations);
    }
}
