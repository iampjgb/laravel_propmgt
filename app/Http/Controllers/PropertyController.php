<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of properties with the selected one for profiling.
     */
    public function index(Request $request)
    {
        // Eager-load relations needed in the frontend
        $properties = Property::with(['unitOwners', 'tenants', 'serviceProviders', 'managementTeam'])
                              ->orderBy('name')
                              ->get();

        // Determine selected property by query param or default to first
        $selected = $request->query('property_id')
            ? $properties->firstWhere('id', $request->property_id)
            : $properties->first();

        return Inertia::render('Properties/Index', [
            'properties'  => $properties,
            'selected'    => $selected,
        ]);
    }

    /**
     * Show a specific property by ID, reusing the same Index page.
     */
    public function show(Property $property)
    {
        // Load the relations for the specific property
        $property->load(['unitOwners', 'tenants', 'serviceProviders', 'managementTeam']);

        // Also need the full list for the dropdown
        $properties = Property::with(['unitOwners', 'tenants', 'serviceProviders', 'managementTeam'])
                              ->orderBy('name')
                              ->get();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'selected'   => $property,
        ]);
    }
}
