<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Filters\UserFilterRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse as Json;

class UserController extends Controller
{
    private UserRepository $UserRepository;

    public function __construct(UserRepository $UserRepository)
    {
        $this->UserRepository = $UserRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param UserFilterRequest $filter
     * @return Json
     */
    public function index(UserFilterRequest $filter): Json
    {
        return response()->json($this->UserRepository->index($filter));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserCreateRequest $request
     * @return Json
     */
    public function store(UserCreateRequest $request): Json
    {
        $request['password'] = bcrypt($request->password);
        return response()->json($this->UserRepository->create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param UserFilterRequest $filter
     * @param int $id
     * @return Json
     */
    public function show(UserFilterRequest $filter, int $id): Json
    {
        return response()->json($this->UserRepository->find($id, $filter));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserUpdateRequest  $request
     * @param  int  $id
     * @return Json
     */
    public function update(UserUpdateRequest $request, int $id): Json
    {
        return  response()->json($this->UserRepository->update($request->all(), $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Json
     */
    public function destroy(int $id): Json
    {
        return response()->json($this->UserRepository->delete($id));
    }

    public function login(Request $request)
    {
        $response = $this->UserRepository->login($request);

        return response()->json($response['data'], $response['status']);
    }

    public function logout()
    {
        return response()->json($this->UserRepository->logout());
    }

    public function user()
    {
        return response()->json($this->UserRepository->user());
    }
}
