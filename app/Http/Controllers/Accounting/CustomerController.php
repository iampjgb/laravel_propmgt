<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        // Whitelist of sortable columns
        $allowedSorts = ['name', 'email', 'phone', 'address', 'balance', 'status', 'created_at'];

        // Sanitize sort_field
        $sortField = $request->input('sort_field', 'name');
        if (! in_array($sortField, $allowedSorts, true)) {
            $sortField = 'name';
        }

        // Sanitize sort_dir
        $sortDir = $request->input('sort_dir', 'asc') === 'desc' ? 'desc' : 'asc';

        // Pagination size
        $perPage = (int) $request->input('per_page', 10);
        if ($perPage <= 0 || $perPage > 100) {
            $perPage = 10;
        }

        // Collect all incoming filters
        $filters = $request->only([
            'search',
            'per_page',
            'sort_field',
            'sort_dir',
            'name_filter',
            'email_filter',
            'phone_filter',
            'address_filter',
            'balance_filter',
            'status_filter',
        ]);

        // Build query
        $query = Contact::customers()
            // Global search across multiple columns
            ->when($filters['search'] ?? null, function ($q, $search) {
                $q->where(function ($q2) use ($search) {
                    $q2->where('name',    'like', "%{$search}%")
                       ->orWhere('email',   'like', "%{$search}%")
                       ->orWhere('phone',   'like', "%{$search}%")
                       ->orWhere('address', 'like', "%{$search}%");
                });
            })
            // Individual column filters
            ->when($filters['name_filter'] ?? null,    fn($q, $v) => $q->where('name',    'like', "%{$v}%"))
            ->when($filters['email_filter'] ?? null,   fn($q, $v) => $q->where('email',   'like', "%{$v}%"))
            ->when($filters['phone_filter'] ?? null,   fn($q, $v) => $q->where('phone',   'like', "%{$v}%"))
            ->when($filters['address_filter'] ?? null, fn($q, $v) => $q->where('address', 'like', "%{$v}%"))
            ->when($filters['balance_filter'] ?? null, function ($q, $v) {
                return is_numeric($v)
                    ? $q->where('balance', $v)
                    : $q;
            })
            ->when($filters['status_filter'] ?? null, fn($q, $v) => $q->where('status',  $v))
            // Apply sorting
            ->orderBy($sortField, $sortDir);

        // Paginate and transform
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

        // Render the Receivables page with section "customers"
        return Inertia::render('Accounting/Receivables', [
            'section'   => 'customers',
            'customers' => $customers,
            'filters'   => $filters,
        ]);
    }
}
