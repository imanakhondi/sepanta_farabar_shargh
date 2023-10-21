<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Resources\Driver\DriverResource;
use App\Http\Resources\Tank\TankResource;
use App\Http\Resources\Truck\TruckResource;
use App\Models\Driver;
use App\Models\CarIntroduction as Model;
use App\Models\Introduction;
use App\Models\Tank;
use App\Models\Truck;
use App\Packages\JsonResponse;
use App\Services\CarIntroductionService;
use App\Services\DriverService;
use App\Services\TankService;
use App\Services\TruckService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CarIntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public CarIntroductionService $service)
    {
        parent::__construct($response);
    }

    public function getAddCarIntroductionProps(): HttpJsonResponse
    {
        $driverService = new DriverService();
        $truckService = new TruckService();
        $tankService = new TankService();
        $drivers = DriverResource::collection($driverService->getAll());
        $trucks = TruckResource::collection($truckService->getAll());
        $tanks = TankResource::collection($tankService->getAll());
        return $this->onItems(['drivers' => $drivers, 'trucks' => $trucks, 'tanks' => $tanks]);
    }

    public function store(Introduction $introduction, Driver $driver, Truck $truck, Tank $tank): HttpJsonResponse
    {
        return $this->onStore($this->service->store($introduction->id, $driver->id, $truck->id, $tank->id));
    }

    public function update(Model $model, Driver $driver, Truck $truck, Tank $tank): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $driver->id, $truck->id, $tank->id));
    }
}
