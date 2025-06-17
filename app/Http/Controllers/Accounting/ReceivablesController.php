<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use App\Models\ContactGroup;

class ReceivablesController extends Controller
{
    /**
     * Display the specified Receivables section.
     */
    public function show(string $section)
    {
        if ($section === 'customers') {
            $perPage = request()->get('per_page', 10);
            $search = request()->get('search', '');
            $sort = request()->get('sort', 'name');
            $direction = request()->get('direction', 'asc');

            $query = Contact::with('contactGroup');
            if ($search) {
                $query->where('name', 'like', "%{$search}%");
            }
            $contacts = $query->orderBy($sort, $direction)
                              ->paginate($perPage)
                              ->withQueryString();

            return Inertia::render('accounting/Receivables', [
                'section' => $section,
                'contacts' => $contacts,
                'contactGroups' => ContactGroup::orderBy('name')->get(['id', 'name']),
            ]);
        }
        return Inertia::render('accounting/Receivables', ['section' => $section]);
    }
}
