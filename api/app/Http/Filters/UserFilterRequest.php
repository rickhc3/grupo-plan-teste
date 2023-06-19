<?php
namespace App\Http\Filters;
use Illuminate\Http\Request;

class UserFilterRequest extends Filter
{
    public string $table = "users";

    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

}
