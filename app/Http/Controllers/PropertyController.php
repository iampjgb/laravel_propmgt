<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        // Render the properties list page with all properties
        $properties = Property::orderBy('name')->get();
        return Inertia::render('Properties/Index', [
            'properties' => $properties,
        ]);
    }

    public function show(Property $property)
    {
        return Inertia::render('Properties/Show', [
            'property' => $property,
        ]);
    }
}