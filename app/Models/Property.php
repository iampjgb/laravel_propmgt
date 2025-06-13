<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}