<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PropertyFactory extends Factory
{
    protected $model = \App\Models\Property::class;

    public function definition()
    {
        return [
            'code'       => 'PROP-'.$this->faker->unique()->bothify('??###'),
            'name'       => $this->faker->company,
            'address1'   => $this->faker->streetAddress,
            'address2'   => $this->faker->optional()->secondaryAddress,
            'city'       => $this->faker->city,
            'province'   => $this->faker->state,
            'country'    => 'Philippines',
            'telephone'  => $this->faker->optional()->phoneNumber,
            'website'    => $this->faker->optional()->url,
            'sec_no'     => Str::upper($this->faker->bothify('SEC##-####')),
            'hlurb_no'   => Str::upper($this->faker->bothify('HLURB-#####')),
            'rdo'        => $this->faker->randomElement(['074','075','076','077']),
            'tin_no'     => $this->faker->numerify('###-###-###-###'),
        ];
    }
}
