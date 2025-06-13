<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use App\Models\Property;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share all properties for dropdown globally if table exists
        if (Schema::hasTable('properties')) {
            Inertia::share('properties', function () {
                return Property::orderBy('name')->get(['id', 'name']);
            });
        } else {
            Inertia::share('properties', []);
        }
    }
}
