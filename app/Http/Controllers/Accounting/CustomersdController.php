<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        // Allowed sort fields to prevent SQL injection
        $allowedSorts = ['name','email','phone','balance','status','address'];

        // Pull and sanitize sort parameters
        $sortField = $request->input('sort_field', 'name');
        if (! in_array($sortField, $allowedSorts, true)) {
            $sortField = 'name';
        }

        $sortDir = $request->input('sort_dir', 'asc');
        if (! in_array($sortDir, ['asc','desc'], true)) {
            $sortDir = 'asc';
        }

        // Pagination
        $perPage = (int) $request->input('per_page', 10);

        // Gather all filters
        $filters = $request->only([
            'search',
            'per_page',
            'sort_field',
            'sort_dir',
            'name_filter',
            'email_filter',
            'phone_filter',
            'balance_filter',
            'status_filter',
        ]);

        // Build query using the customers scope
        $query = Contact::customers()
            // Global search across multiple columns
            ->when($filters['search'] ?? null, function($q, $search) {
                $q->where(function($q2) use ($search) {
                    $q2->where('name',   'like', "%{$search}%")
                       ->orWhere('email',  'like', "%{$search}%")
                       ->orWhere('phone',  'like', "%{$search}%")
                       ->orWhere('address','like', "%{$search}%");
                });
            })
            // Column-specific filters
            ->when($filters['name_filter'] ?? null,  fn($q,$v)=> $q->where('name',   'like', "%{$v}%"))
            ->when($filters['email_filter'] ?? null, fn($q,$v)=> $q->where('email',  'like', "%{$v}%"))
            ->when($filters['phone_filter'] ?? null, fn($q,$v)=> $q->where('phone',  'like', "%{$v}%"))
            ->when($filters['balance_filter'] ?? null, fn($q,$v)=> $q->where('balance', $v))
            ->when($filters['status_filter'] ?? null, fn($q,$v)=> $q->where('status',  $v))
            // Sorting
            ->orderBy($sortField, $sortDir);

        // Paginate and transform each Contact
        $customers = $query
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn(Contact $c) => [
                'id'      => $c->id,
                'name'    => $c->name,
                'email'   => $c->email,
                'phone'   => $c->phone,
                'address' => $c->address,
                'balance' => (float) $c->balance,
                'status'  => $c->status,
            ]);

        // Render the Receivables page, passing section="customers"
        return Inertia::render('Accounting/Receivables', [
            'section'   => 'customers',
            'customers' => $customers,
            'filters'   => $filters,
        ]);
    }
}
