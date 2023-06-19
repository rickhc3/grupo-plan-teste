<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\Filterable;


class HomeAppliance extends Model
{
    use HasFactory, Filterable;

    protected $table = 'home_appliances';

    protected $casts = [
        'id' => 'integer',
    ];
    protected $fillable = [
        'name',
        'description',
        'voltage',
        'brand',
    ];
}
