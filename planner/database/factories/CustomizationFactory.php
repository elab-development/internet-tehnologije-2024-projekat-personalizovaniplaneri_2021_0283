<?php

namespace Database\Factories;

use App\Models\Customization;
use App\Models\Planner;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customization>
 */
class CustomizationFactory extends Factory
{
    protected $model = Customization::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'boja' => $this->faker->safeColorName(), // Nasumična boja
            'slika' => $this->faker->imageUrl(), // Nasumična slika
            'font' => $this->faker->randomElement(['Arial', 'Times New Roman', 'Verdana', 'Tahoma']), // Nasumičan font
            'tekst' => $this->faker->sentence(), // Nasumičan tekst
            'planner_id' => Planner::inRandomOrder()->first()->id, // Nasumičan ID planera
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
