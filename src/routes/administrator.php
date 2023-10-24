<?php

use App\Http\Controllers\Administrator\BarOwnerController;
use App\Http\Controllers\Administrator\CarIntroductionController;
use App\Http\Controllers\Administrator\CityController;
use App\Http\Controllers\Administrator\CompanyController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\DriverController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\IntroductionController;
use App\Http\Controllers\Administrator\RepairController;
use App\Http\Controllers\Administrator\TankController;
use App\Http\Controllers\Administrator\TruckController;
use App\Http\Controllers\Administrator\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('tanks/store/{company}', [TankController::class, 'store']);
    Route::post('tanks/update/{model}', [TankController::class, 'update']);

    Route::post('trucks/store', [TruckController::class, 'store']);
    Route::post('trucks/update/{model}', [TruckController::class, 'update']);

    Route::post('drivers/store', [DriverController::class, 'store']);
    Route::post('drivers/update/{model}', [DriverController::class, 'update']);

    Route::post('companies/store', [CompanyController::class, 'store']);
    Route::post('companies/update/{model}', [CompanyController::class, 'update']);

    Route::post('cities/store', [CityController::class, 'store']);
    Route::post('cities/update/{model}', [CityController::class, 'update']);

    Route::post('bar_owners/store', [BarOwnerController::class, 'store']);
    Route::post('bar_owners/update/{model}', [BarOwnerController::class, 'update']);

    Route::post('introductions/store/{barOwner}/{startPoint}/{endPoint}', [IntroductionController::class, 'store']);

    Route::post('repairs/store/{tank}', [RepairController::class, 'store']);
    Route::post('repairs/update/{model}', [RepairController::class, 'update']);

    Route::post('car_introductions/add_props/{introduction}', [CarIntroductionController::class, 'getAddCarIntroductionProps']);
    Route::post('car_introductions/store/{introduction}/{driver}/{truck}/{tank}', [CarIntroductionController::class, 'store']);
    Route::post('car_introductions/update/{model}/{driver}/{truck}/{tank}', [CarIntroductionController::class, 'update']);
    Route::post('car_introductions/update_2/{model}', [CarIntroductionController::class, 'updateStep2']);
    Route::post('car_introductions/update_3/{model}', [CarIntroductionController::class, 'updateStep3']);
});
