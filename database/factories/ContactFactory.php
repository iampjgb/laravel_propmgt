<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Property;
use App\Models\Contact;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition()
    {
        $propertyIds = Property::pluck('id')->toArray();
        return [
            'property_id' => $this->faker->randomElement($propertyIds),
            'name'        => $this->faker->name(),
            'email'       => $this->faker->unique()->safeEmail(),
            'phone'       => $this->faker->phoneNumber(),
            'category'    => 'tenant',
            'service_type'=> null,
        ];
    }

    // Contact categories
    public function unitOwner()
    {
        return $this->state(fn() => ['category' => 'unit_owner']);
    }

    public function tenant()
    {
        return $this->state(fn() => ['category' => 'tenant']);
    }

    public function management()
    {
        return $this->state(fn() => ['category' => 'management']);
    }

    public function serviceProvider()
    {
        return $this->state(fn() => [
            'category'     => 'service_provider',
            'service_type'=> $this->faker->randomElement(['Security','Maintenance','Housekeeping'])
        ]);
    }

    public function security()
    {
        return $this->state(fn() => [
            'category'     => 'service_provider',
            'service_type'=> 'Security'
        ]);
    }

    public function maintenanceProvider()
    {
        return $this->state(fn() => [
            'category'     => 'service_provider',
            'service_type'=> 'Maintenance'
        ]);
    }

    public function housekeeping()
    {
        return $this->state(fn() => [
            'category'     => 'service_provider',
            'service_type'=> 'Housekeeping'
        ]);
    }
}
