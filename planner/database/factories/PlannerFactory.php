<?php

namespace Database\Factories;

use App\Models\Planner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Planner>
 */
class PlannerFactory extends Factory
{
    protected $model = Planner::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
                'naziv' => $this->faker->word(), // Generiše nasumičan naziv planera, npr. "Moj Planer"
                'status' => $this->faker->randomElement(['poslat', 'u obradi', 'otkazan', 'u pripremi']), // Nasumičan status planera
        ];
    }
}
