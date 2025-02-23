<?php

namespace App\Http\Controllers;

use App\Models\Customization;
use App\Models\Planner;
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
        $request->validate([
            'naziv' => 'required|string|max:255',
            'boja' => 'required|string',
            'font' => 'required|string',
            'tekst' => 'nullable|string',
            'slika' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Sačuvaj sliku ako je priložena
        $imagePath = null;
        if ($request->hasFile('slika')) {
            $imagePath = $request->file('slika')->store('planner_images', 'public');
        }

        // Kreiraj planer
        $planner = Planner::create([
            'naziv' => $request->naziv,
            'status' => 'u prpremi'
        ]);

        // Kreiraj customizaciju
        $customization = Customization::create([
            'color' => $request->color,
            'font' => $request->font,
            'text' => $request->text,
            'image_path' => $imagePath,
            'planner_id' => $planner->id,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'message' => 'Planer uspešno sačuvan',
            'planner' => $planner,
            'customization' => $customization,
            'customization_id' => $customization->id,
        ]);
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
    /**
 * Remove the specified resource from storage.
 */
public function destroy($customizationId)
{
    $customization = Customization::find($customizationId);
    
    if (is_null($customization)) {
        return response()->json('Customization not found', 404);
    }

    // Brisanje povezane slike sa diska, ako postoji
    if ($customization->image_path && Storage::disk('public')->exists($customization->image_path)) {
        Storage::disk('public')->delete($customization->image_path);
    }

    // Obriši povezani planer
    $customization->planner()->delete(); // Obriši povezani planer

    // Brisanje customizacije
    $customization->delete();

    return response()->json(['message' => 'Customization and associated planner successfully deleted']);
}


}


