<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $perPage   = $request->input('per_page', 10);
        $search    = $request->input('search', '');
        $sortField = $request->input('sort_field', 'name');
        $sortDir   = $request->input('sort_dir', 'asc');

        // Use the `customers` scope on Contact
        $query = Contact::customers()
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy($sortField, $sortDir);

        $customers = $query->paginate($perPage)
            ->withQueryString()
            ->through(fn(Contact $c) => [
                'id'       => $c->id,
                'name'     => $c->name,
                'email'    => $c->email,
                'phone'    => $c->phone,
                'address'  => $c->address,   // if you’ve added address to fillable
                'balance'  => $c->balance,
                'status'   => $c->status,
            ]);

        return Inertia::render('Accounting/Receivables', [
            'section'   => 'customers',
            'customers' => $customers,
            'filters'   => $request->only('search', 'per_page', 'sort_field', 'sort_dir'),
        ]);
    }
}
