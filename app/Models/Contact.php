<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * Uncomment if your table name differs.
     *
     * @var string
     */
    // protected $table = 'contacts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'property_id',
        'contact_group_id',
        'type',            // e.g. 'customer', 'tenant', 'vendor'
        'name',
        'email',
        'phone',
        'address',
        'balance',
        'status',
        'service_type',
        'tin',
        'vip',
        'active',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'balance' => 'decimal:2',
        'vip'     => 'boolean',
        'active'  => 'boolean',
    ];

    /**
     * Scope a query to only include customers.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCustomers($query)
    {
        return $query->where('type', 'customer');
    }

    /**
     * Get the property that owns the contact.
     *
     * @return BelongsTo
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the contact group this contact belongs to.
     *
     * @return BelongsTo
     */
    public function contactGroup(): BelongsTo
    {
        return $this->belongsTo(ContactGroup::class);
    }

    /**
     * Example relationship: invoices associated with this contact.
     * Uncomment and adjust if needed.
     *
     * // public function invoices()
     * // {
     * //     return $this->hasMany(Invoice::class, 'customer_id');
     * // }
     */
}
