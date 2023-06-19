<?php

namespace App\Http\Filters;

use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class HomeApplianceFilterRequest extends Filter
{
    /**
     * Set the table to filter
     *
     * @var String
     */
    public string $table = "home_appliances";

    #[Pure]
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

}
