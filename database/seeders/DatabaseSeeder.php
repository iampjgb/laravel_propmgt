<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run property and contact seeders
        $this->call([
            PropertiesTableSeeder::class,
            ContactGroupSeeder::class,
            ContactSeeder::class,
        ]);

        // Create a test user
        User::factory()->create([
            'name'  => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
