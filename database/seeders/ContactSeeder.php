<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\ContactGroup;
use App\Models\Property;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Seed supporting tables
        ContactGroup::factory()->count(5)->create();
        Property::factory()->count(20)->create();

        $randomGroup    = function () {
            return ContactGroup::inRandomOrder()->first()->id;
        };
        $randomProperty = function () {
            return Property::inRandomOrder()->first()->id;
        };

        // 2) Customers: 200 contacts
        Contact::factory()
            ->count(200)
            ->state(function () use ($randomGroup, $randomProperty) {
                return [
                    'contact_group_id' => $randomGroup(),
                    'property_id'      => $randomProperty(),
                    'type'             => 'customer',
                    'category'         => 'customer',
                ];
            })
            ->create();

        // 3) Management: 10 contacts
        Contact::factory()
            ->count(10)
            ->state(function () use ($randomGroup, $randomProperty) {
                return [
                    'contact_group_id' => $randomGroup(),
                    'property_id'      => $randomProperty(),
                    'type'             => 'management',
                    'category'         => 'management',
                ];
            })
            ->create();

        // 4) Service Providers: 90 total (30 each)
        foreach (['Security', 'Maintenance', 'Housekeeping'] as $service) {
            Contact::factory()
                ->count(30)
                ->state(function () use ($randomGroup, $randomProperty, $service) {
                    return [
                        'contact_group_id' => $randomGroup(),
                        'property_id'      => $randomProperty(),
                        'type'             => 'service_provider',
                        'category'         => 'service_provider',
                        'service_type'     => $service,
                    ];
                })
                ->create();
        }

        // 5) Unit Owners: 950 contacts
        Contact::factory()
            ->count(950)
            ->state(function () use ($randomGroup, $randomProperty) {
                return [
                    'contact_group_id' => $randomGroup(),
                    'property_id'      => $randomProperty(),
                    'type'             => 'unit_owner',
                    'category'         => 'unit_owner',
                ];
            })
            ->create();

        // 6) Tenants: 950 contacts
        Contact::factory()
            ->count(950)
            ->state(function () use ($randomGroup, $randomProperty) {
                return [
                    'contact_group_id' => $randomGroup(),
                    'property_id'      => $randomProperty(),
                    'type'             => 'tenant',
                    'category'         => 'tenant',
                ];
            })
            ->create();
    }
}
