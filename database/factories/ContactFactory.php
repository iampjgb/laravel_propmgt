<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Contact;
use App\Models\Property;
use App\Models\ContactGroup;

class ContactFactory extends Factory
{
    /**
     * The model that this factory corresponds to.
     *
     * @var string
     */
    protected $model = Contact::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id'       => Property::factory(),
            'contact_group_id'  => ContactGroup::factory(),
            'type'              => $this->faker->randomElement(['customer', 'tenant', 'vendor']),
            'name'              => $this->faker->name(),
            'email'             => $this->faker->unique()->safeEmail(),
            'phone'             => $this->faker->phoneNumber(),
            'address'           => $this->faker->address(),
            'balance'           => $this->faker->randomFloat(2, 0, 10000),
            'status'            => $this->faker->randomElement(['active', 'inactive']),
            'service_type'      => $this->faker->word(),
            'tin'               => $this->faker->numerify('#########'),
            'vip'               => $this->faker->boolean(10),
            'active'            => $this->faker->boolean(90),
        ];
    }

    /**
     * Force the contact type to 'customer'.
     *
     * @return static
     */
    public function customer(): static
    {
        return $this->state(function (array $attributes): array {
            return ['type' => 'customer'];
        });
    }
}
