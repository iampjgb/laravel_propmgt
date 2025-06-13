<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        // Management: at most 10 contacts
        Contact::factory()->count(10)->management()->create();

        // Service Providers: 90 total (30 each)
        Contact::factory()->count(30)->security()->create();
        Contact::factory()->count(30)->maintenanceProvider()->create();
        Contact::factory()->count(30)->housekeeping()->create();

        // Unit Owners & Tenants: split evenly for remaining ~1900
        Contact::factory()->count(950)->unitOwner()->create();
        Contact::factory()->count(950)->tenant()->create();
    }
}

// In database/seeders/DatabaseSeeder.php, register:
// $this->call(ContactSeeder::class);