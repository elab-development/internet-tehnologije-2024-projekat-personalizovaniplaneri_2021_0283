<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();
        
        /*
        Category::create([
            'naziv'=>"Mama"
        ]);
        Category::create([
            'naziv'=>"Posao"
        ]);
        Category::create([
            'naziv'=>"Skola"
        ]);
        Category::create([
            'naziv'=>"Trening"
        ]);
        Category::create([
            'naziv'=>"Putovanja"
        ]);
        */
    }
}
