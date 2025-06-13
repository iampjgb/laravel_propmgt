<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display the properties list and selected property details.
     * Supports optional route-model binding on `$selectedProperty`.
     */
    public function index(Request $request, Property $selectedProperty = null)
    {
        // Eager-load all relevant relations
        $properties = Property::with([
            'unitOwners',
            'tenants',
            'serviceProviders',
            'managementTeam',
        ])->orderBy('name')->get();

        // If route-model bound, use that, otherwise fallback to query param or first
        $selected = $selectedProperty
            ?? ($request->query('property_id')
                ? $properties->firstWhere('id', $request->property_id)
                : null)
            ?? $properties->first();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'selected'   => $selected,
        ]);
    }

    /**
     * Redirect show() to index() so tabs always live on the same page.
     */
    public function show(Property $property)
    {
        return redirect()->route('properties.index', ['property_id' => $property->id]);
    }
}
