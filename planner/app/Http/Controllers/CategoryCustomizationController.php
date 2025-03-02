<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customization;

class CategoryCustomizationController extends Controller
{
    public function index($category_id)
    {
        $customizations = Customization::get()->where('category_id', $category_id);
        if (is_null($customizations))
            return response()->json('Data not found', 404);
        return response()->json($customizations);
    }
}
