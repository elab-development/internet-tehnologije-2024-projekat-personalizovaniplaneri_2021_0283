<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class PlannerOrderController extends Controller
{
    public function index($planner_id)
    {
        $orders = Order::get()->where('planner_id', $planner_id);
        if (is_null($orders))
            return response()->json('Data not found', 404);
        return response()->json($orders);
    }
}
