<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\Accounting\ReceivablesController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Properties
    Route::get('/properties', [PropertyController::class, 'index'])
         ->name('properties.index');
    Route::get('/properties/{property}', [PropertyController::class, 'show'])
         ->name('properties.show');

    // Receivables — parent handler for overview, invoices, customers, etc.
    Route::prefix('accounting/receivables')
         ->name('accounting.receivables.')
         ->group(function () {
             // Redirect bare /accounting/receivables → overview
             Route::get('/', fn() => redirect()->route('accounting.receivables.show', 'overview'));

             // Single {section} route handles overview|invoices|collections|batch-transactions|
             // meter-reading|customers|charges-items
             Route::get('{section}', [ReceivablesController::class, 'show'])
                  ->where('section', 'overview|invoices|collections|batch-transactions|meter-reading|customers|charges-items')
                  ->name('show');
         });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
