<?php

namespace App\Providers;

use App\Constants\Theme;
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
use App\Http\Controllers\User\BarOwnerController as UserBarOwnerController;
use App\Http\Controllers\User\CarIntroductionController as UserCarIntroductionController;
use App\Http\Controllers\User\CityController as UserCityController;
use App\Http\Controllers\User\CompanyController as UserCompanyController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\DriverController as UserDriverController;
use App\Http\Controllers\User\IntroductionController as UserIntroductionController;
use App\Http\Controllers\User\RepairController as UserRepairController;
use App\Http\Controllers\User\TankController as UserTankController;
use App\Http\Controllers\User\TruckController as UserTruckController;
use App\Http\Controllers\User\UserController as UserUserController;
use App\Http\Resources\BarOwner\BarOwnerResource;
use App\Http\Resources\CarIntroduction\CarIntroductionResource;
use App\Http\Resources\City\CityResource;
use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\Driver\DriverResource;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\Introduction\IntroductionResource;
use App\Http\Resources\Repair\RepairResource;
use App\Http\Resources\Tank\TankResource;
use App\Http\Resources\Truck\TruckResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\BarOwnerService;
use App\Services\CarIntroductionService;
use App\Services\CityService;
use App\Services\CompanyService;
use App\Services\DriverService;
use App\Services\ErrorService;
use App\Services\IntroductionService;
use App\Services\RepairService;
use App\Services\TankService;
use App\Services\TruckService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function () {
            return new Helper();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(ErrorController::class, function ($app) {
            return new ErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserDashboardController::class, function ($app) {
            return new UserDashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(UserUserController::class, function ($app) {
            return new UserUserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(TankController::class, function ($app) {
            return new TankController(new JsonResponse(TankResource::class), $app->make(TankService::class));
        });

        $this->app->bind(UserTankController::class, function ($app) {
            return new UserTankController(new JsonResponse(TankResource::class), $app->make(TankService::class));
        });

        $this->app->bind(TruckController::class, function ($app) {
            return new TruckController(new JsonResponse(TruckResource::class), $app->make(TruckService::class));
        });

        $this->app->bind(UserTruckController::class, function ($app) {
            return new UserTruckController(new JsonResponse(TruckResource::class), $app->make(TruckService::class));
        });

        $this->app->bind(DriverController::class, function ($app) {
            return new DriverController(new JsonResponse(DriverResource::class), $app->make(DriverService::class));
        });

        $this->app->bind(UserDriverController::class, function ($app) {
            return new UserDriverController(new JsonResponse(DriverResource::class), $app->make(DriverService::class));
        });

        $this->app->bind(CompanyController::class, function ($app) {
            return new CompanyController(new JsonResponse(CompanyResource::class), $app->make(CompanyService::class));
        });

        $this->app->bind(UserCompanyController::class, function ($app) {
            return new UserCompanyController(new JsonResponse(CompanyResource::class), $app->make(CompanyService::class));
        });

        $this->app->bind(CityController::class, function ($app) {
            return new CityController(new JsonResponse(CityResource::class), $app->make(CityService::class));
        });

        $this->app->bind(UserCityController::class, function ($app) {
            return new UserCityController(new JsonResponse(CityResource::class), $app->make(CityService::class));
        });

        $this->app->bind(BarOwnerController::class, function ($app) {
            return new BarOwnerController(new JsonResponse(BarOwnerResource::class), $app->make(BarOwnerService::class));
        });

        $this->app->bind(UserBarOwnerController::class, function ($app) {
            return new UserBarOwnerController(new JsonResponse(BarOwnerResource::class), $app->make(BarOwnerService::class));
        });

        $this->app->bind(IntroductionController::class, function ($app) {
            return new IntroductionController(new JsonResponse(IntroductionResource::class), $app->make(IntroductionService::class));
        });

        $this->app->bind(UserIntroductionController::class, function ($app) {
            return new UserIntroductionController(new JsonResponse(IntroductionResource::class), $app->make(IntroductionService::class));
        });

        $this->app->bind(RepairController::class, function ($app) {
            return new RepairController(new JsonResponse(RepairResource::class), $app->make(RepairService::class));
        });

        $this->app->bind(UserRepairController::class, function ($app) {
            return new UserRepairController(new JsonResponse(RepairResource::class), $app->make(RepairService::class));
        });

        $this->app->bind(CarIntroductionController::class, function ($app) {
            return new CarIntroductionController(new JsonResponse(CarIntroductionResource::class), $app->make(CarIntroductionService::class));
        });

        $this->app->bind(UserCarIntroductionController::class, function ($app) {
            return new UserCarIntroductionController(new JsonResponse(CarIntroductionResource::class), $app->make(CarIntroductionService::class));
        });
    }
}
