<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ime' => $this->faker->firstName(),  // Generiši srpsko ime
            'prezime' => $this->faker->lastName(),  // Generiši srpsko prezime
            'email' => $this->faker->unique()->safeEmail(),
            'sifra' => bcrypt('password'),  // Generiši šifru (bcrypt-ovana)
            'datum_registracije' => $this->faker->dateTime(),  // Datum registracije
            'type_id' => $this->faker->randomDigit(),  // Tip korisnika (nasumično generiši broj)
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
