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
});

// Properties routes
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');

// Accounting Receivables routes
Route::get('/accounting/receivables', fn() => redirect()->route('accounting.receivables', ['section' => 'overview']));
Route::get('/accounting/receivables/{section}', [ReceivablesController::class, 'show'])
     ->where('section', 'overview|invoices|collections|batch-transactions|meter-reading|customers|charges-items')
     ->name('accounting.receivables');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
