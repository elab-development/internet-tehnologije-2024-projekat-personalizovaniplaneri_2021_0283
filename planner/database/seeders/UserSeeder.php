<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Type;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();

        if (Type::count() === 0) {
            $this->call(TypeSeeder::class);
        }

        User::factory(10)->create();

    /*    User::factory()->create([
            'ime' => 'Test User',  
            'prezime' => 'Testov', 
            'email' => 'test@example.com',  
            'sifra' => bcrypt('password'),  
        ]);
        */
    }
}
