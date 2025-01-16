<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use Faker\Factory as Faker;
use App\Models\Planner;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::truncate();
        $faker = Faker::create();

        // Kreiramo 10 porudžbina
        foreach (range(1, 10) as $index) {
            // Uzmi nasumičnog korisnika
            $user = User::inRandomOrder()->first(); // Nasumičan korisnik sa postojećim ID-em
            $planner = Planner::inRandomOrder()->first();

            Order::create([
                'datum_porucivanja' => $faker->dateTimeThisYear(), // Nasumičan datum porudžbine unutar ove godine
                'cena' => $faker->randomFloat(2, 10, 500), // Nasumična cena između 10 i 500
                'status_porudzbine' => $faker->randomElement(['čekanje', 'u procesu', 'završeno']), // Nasumičan status porudžbine
                'user_id' => $user->id, // ID korisnika
                'planner_id' => $planner->id
            ]);
        }
    }
}