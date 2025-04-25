<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Planner;
use App\Models\Customization;
use App\Http\Resources\OrderCollection;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return new OrderCollection($orders);
    }

    public function store(Request $request)
    {
        $ordersData = $request->all(); // Dobija niz iz JSON tela zahteva

        if (!is_array($ordersData)) {
            return response()->json(['message' => 'Nevalidan format podataka'], 400);
        }

        foreach ($ordersData as $orderItem) {
            // Kreiraj planer
            $planner = Planner::create([
                'naziv' => $orderItem['naziv'],
                'status' => 'u pripremi'
            ]);

            // Kreiraj customizaciju
            $customization = Customization::create([
                'boja' => $orderItem['boja'],
                'font' => $orderItem['font'],
                'tekst' => $orderItem['tekst'],
                'slika' => $orderItem['slika'], // Pretpostavlja se da je slika URL ili base64
                'planner_id' => $planner->id,
                'category_id' => $orderItem['category_id'],
            ]);

            // Kreiraj narudžbinu
            Order::create([
                'planner_id' => $planner->id,
                'user_id' => $orderItem['user_id'],
                'cena' => $orderItem['cena'],
                'status_porudzbine'=>'poruceno'
                
            ]);
        }

        return response()->json([
            'message' => 'Porudžbina uspešno poslata',
        ], 201);
    }

    public function show($order_id)
    {
        $order = Order::find($order_id);
        if (is_null($order)) {
            return response()->json('Data not found', 404);
        }
        return response()->json($order);
    }
}