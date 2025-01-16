<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Customization;
use App\Models\Planner;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CustomizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customization::truncate();
        $planner = Planner::first(); 
        $category = Category::first();

        if ($planner && $category) {

        Customization::create([
            'boja' => 'Plava', // Primer boje
            'slika' => 'image_path_here.jpg', // Putanja do slike
            'font' => 'Arial', // Primer fonta
            'tekst' => 'Ovo je primer teksta za customizaciju.', // Tekst
            'planner_id' => $planner->id, // ID plannera
            'category_id' => $category->id, // ID kategorije
        ]);

        Customization::create([
            'boja' => 'Crvena',
            'slika' => 'another_image_path.jpg',
            'font' => 'Times New Roman',
            'tekst' => 'Još jedan primer teksta.',
            'planner_id' => $planner->id,
            'category_id' => $category->id,
        ]);
        } else {
            // Ako nema dostupnih podataka u tabelama, možete ispisati grešku
            $this->command->error('Nema dostupnih podataka za planner i/ili kategoriju.');
        }
    }
}
