<?php

namespace App\Http\Controllers;

use App\Models\Customer;
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

        $query = Customer::query()
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy($sortField, $sortDir);

        $customers = $query->paginate($perPage)
                           ->withQueryString()
                           ->through(fn($c) => [
                               'id'      => $c->id,
                               'name'    => $c->name,
                               'email'   => $c->email,
                               'phone'   => $c->phone,
                               'address' => $c->address,
                           ]);

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters'   => $request->only('search', 'per_page', 'sort_field', 'sort_dir'),
        ]);
    }
}
