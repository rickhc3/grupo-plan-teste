<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\HomeApplianceCreateRequest;
use App\Http\Requests\HomeApplianceUpdateRequest;
use App\Http\Filters\HomeApplianceFilterRequest;
use App\Repositories\HomeApplianceRepository;
use Illuminate\Http\JsonResponse as Json;


class HomeApplianceController extends Controller
{

    private HomeApplianceRepository $HomeApplianceRepository;

    public function __construct(HomeApplianceRepository $HomeApplianceRepository)
    {
       $this->HomeApplianceRepository = $HomeApplianceRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param HomeApplianceFilterRequest $filter
     * @return Json
     */
    public function index(HomeApplianceFilterRequest $filter): Json
    {
        return response()->json($this->HomeApplianceRepository->index($filter));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param HomeApplianceCreateRequest $request
     * @return Json
     */
    public function store(HomeApplianceCreateRequest $request): Json
    {
        return response()->json($this->HomeApplianceRepository->create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param HomeApplianceFilterRequest $filter
     * @param int $id
     * @return Json
     */
    public function show(HomeApplianceFilterRequest $filter, int $id): Json
    {
        return response()->json($this->HomeApplianceRepository->find($id, $filter));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  HomeApplianceUpdateRequest  $request
     * @param  int  $id
     * @return Json
     */
    public function update(HomeApplianceUpdateRequest $request, int $id): Json
    {
        return  response()->json($this->HomeApplianceRepository->update($request->all(), $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Json
     */
    public function destroy(int $id): Json
    {
        return response()->json($this->HomeApplianceRepository->delete($id));
    }

    public function countQuantityRecords(): Json
    {
        return response()->json($this->HomeApplianceRepository->countQuantityRecords());
    }
}
