<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'property_id',
        'name',
        'email',
        'phone',
        'category',
        'service_type',
    ];

    /**
     * Get the property that owns the contact.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
