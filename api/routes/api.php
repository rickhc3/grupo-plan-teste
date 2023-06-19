<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeApplianceController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource("home-appliances", HomeApplianceController::class)->except('show');
    Route::apiResource("users", UserController::class);
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('user', [UserController::class, 'user']);
});


Route::post('login', [UserController::class, 'login']);
Route::get("home-appliances", [HomeApplianceController::class, 'index']);
Route::get("home-appliances/{id}", [HomeApplianceController::class, 'show']);
Route::get("count-quantity-records", [HomeApplianceController::class, 'countQuantityRecords']);
