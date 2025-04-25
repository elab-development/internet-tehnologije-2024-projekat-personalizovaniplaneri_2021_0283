<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\Models\Planner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datum_porucivanja' => $this->faker->dateTimeThisYear(), // Nasumičan datum porudžbine unutar ove godine
            'cena' => $this->faker->randomFloat(2, 10, 500), // Nasumična cena između 10 i 500
            'status_porudzbine' => $this->faker->randomElement(['čekanje', 'u procesu', 'završeno']), // Nasumičan status porudžbine
            'user_id' => User::inRandomOrder()->first()->id, // Nasumičan korisnik (ID)
            'planner_id' => Planner::inRandomOrder()->first()->id // Nasumičan planer (ID)
        ];
    }
}
