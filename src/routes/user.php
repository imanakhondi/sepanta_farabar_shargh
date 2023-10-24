<?php

use App\Http\Controllers\User\BarOwnerController;
use App\Http\Controllers\User\CarIntroductionController;
use App\Http\Controllers\User\CityController;
use App\Http\Controllers\User\CompanyController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\DriverController;
use App\Http\Controllers\User\IntroductionController;
use App\Http\Controllers\User\RepairController;
use App\Http\Controllers\User\TankController;
use App\Http\Controllers\User\TruckController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/change_password', [UserController::class, 'changePassword']);
});

// 'user' | 'administrators' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
    Route::post('users/auth', [UserController::class, 'showAuth']);

    Route::post('tanks/{company}', [TankController::class, 'index']);
    Route::post('tanks/show/{model}', [TankController::class, 'show']);

    Route::post('trucks', [TruckController::class, 'index']);
    Route::post('trucks/show/{model}', [TruckController::class, 'show']);

    Route::post('drivers', [DriverController::class, 'index']);
    Route::post('drivers/show/{model}', [DriverController::class, 'show']);

    Route::post('companies', [CompanyController::class, 'index']);
    Route::post('companies/show/{model}', [CompanyController::class, 'show']);

    Route::post('cities', [CityController::class, 'index']);
    Route::post('cities/show/{model}', [CityController::class, 'show']);

    Route::post('bar_owners', [BarOwnerController::class, 'index']);
    Route::post('bar_owners/show/{model}', [BarOwnerController::class, 'show']);

    Route::post('introductions', [IntroductionController::class, 'index']);
    Route::post('introductions/props', [IntroductionController::class, 'getIntroductionProps']);
    Route::post('introductions/show/{model}', [IntroductionController::class, 'show']);

    Route::post('repairs/{tank}', [RepairController::class, 'index']);
    Route::post('repairs/show/{model}', [RepairController::class, 'show']);

    Route::post('car_introductions/{introduction}', [CarIntroductionController::class, 'index']);
    Route::post('car_introductions/show/{model}', [CarIntroductionController::class, 'show']);
});
