<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Contact;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'address1',
        'address2',
        'city',
        'province',
        'country',
        'telephone',
        'website',
        'sec_no',
        'hlurb_no',
        'rdo',
        'tin_no',
    ];

    /**
     * Unit owners: contacts with category 'unit_owner'
     */
    public function unitOwners()
    {
        return $this->hasMany(Contact::class)
                    ->where('category', 'unit_owner');
    }

    /**
     * Tenants: contacts with category 'tenant'
     */
    public function tenants()
    {
        return $this->hasMany(Contact::class)
                    ->where('category', 'tenant');
    }

    /**
     * Service providers: contacts with category 'service_provider'
     */
    public function serviceProviders()
    {
        return $this->hasMany(Contact::class)
                    ->where('category', 'service_provider');
    }

    /**
     * Management team: contacts with category 'management'
     */
    public function managementTeam()
    {
        return $this->hasMany(Contact::class)
                    ->where('category', 'management');
    }
}
