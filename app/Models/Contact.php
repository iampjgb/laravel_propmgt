<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ContactGroup;

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
        'contact_group_id',
        'name',
        'email',
        'phone',
        'category',
        'service_type',
        'tin',
        'vip',
        'active',
    ];

    /**
     * Get the property that owns the contact.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the contact group this contact belongs to.
     */
    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }
}
