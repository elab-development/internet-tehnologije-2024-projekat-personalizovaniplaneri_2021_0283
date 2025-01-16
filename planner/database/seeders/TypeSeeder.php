<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Type;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Type::truncate();

        Type::create([
            'naziv' => 'Admin', // Tip korisnika: Admin
        ]);

        Type::create([
            'naziv' => 'Korisnik', // Tip korisnika: Korisnik
        ]);

        Type::create([
            'naziv' => 'Guest', // Tip korisnika: Gost
        ]);
    }
}
