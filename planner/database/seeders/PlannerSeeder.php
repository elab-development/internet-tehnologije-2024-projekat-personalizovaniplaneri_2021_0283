<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Planner;

class PlannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Planner::truncate();

        Planner::create([
            
            'naziv' => 'Moj planer', // Naziv planera
            'status' => 'poslat', // Status planera
        ]);

        Planner::create([
            'naziv' => 'Naziv mog planera', // Naziv planera
            'status' => 'u obradi', // Status planera
        ]);

        Planner::create([
            'naziv' => 'Kreativni planer', // Naziv planera
            'status' => 'otkazan', // Status planera
        ]);

        Planner::create([
            'naziv' => 'Ja planer', // Naziv planera
            'status' => 'u pripremi', // Status planera
        ]);
        
    }
}
