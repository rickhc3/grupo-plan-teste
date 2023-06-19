<?php


namespace App\Repositories;

use App\Models\HomeAppliance;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class HomeApplianceRepository extends Repository
{
    public function __construct(HomeAppliance $Model)
    {
        $this->Model = $Model;
    }

    public function countQuantityRecords(): array
    {
        $allCount = $this->Model->count();

        $brands = $this->Model->select('brand', DB::raw('count(*) as total'))
            ->groupBy('brand')
            ->get();

        $brandCounts = $brands->map(function ($item) {
            return [
                'brand' => $item->brand,
                'total' => $item->total,
            ];
        });

        return [
            'all' => $allCount,
            'brands' => $brandCounts,
        ];
    }
}
