<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tank\UpdateTankRequest;
use App\Http\Resources\Driver\DriverResource;
use App\Http\Resources\Tank\TankResource;
use App\Http\Resources\Truck\TruckResource;
use App\Models\Driver;
use App\Models\Tank as Model;
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

    public function store(Driver $driver, Truck $truck, Tank $tank): HttpJsonResponse
    {
        return $this->onStore($this->service->store($driver->id, $truck->id, $tank->id));
    }

    public function update(Model $model, UpdateTankRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->tank_no, $request->psi_date, $request->test_validity_date, $request->capotage_date));
    }
}
