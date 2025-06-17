<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceivablesController extends Controller
{
    public function show(Request $request, string $section)
    {
        // Base props for every section
        $props = [
            'section' => $section,
        ];

        if ($section === 'customers') {
            $perPage   = $request->input('per_page', 10);
            $search    = $request->input('search', '');
            $sortField = $request->input('sort_field', 'name');
            $sortDir   = $request->input('sort_dir', 'asc');

            // Use Contact::customers() scope
            $query = Contact::customers()
                ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
                ->orderBy($sortField, $sortDir);

            $customers = $query
                ->paginate($perPage)
                ->withQueryString()
                ->through(fn(Contact $c) => [
                    'id'       => $c->id,
                    'name'     => $c->name,
                    'email'    => $c->email,
                    'phone'    => $c->phone,
                    'address'  => $c->address,
                    'balance'  => $c->balance,
                    'status'   => $c->status,
                ]);

            $props['customers'] = $customers;
            $props['filters']   = $request->only('search', 'per_page', 'sort_field', 'sort_dir');
        }

        return Inertia::render('Accounting/Receivables', $props);
    }
}
