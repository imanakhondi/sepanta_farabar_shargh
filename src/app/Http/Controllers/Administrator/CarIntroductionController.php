<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\CarIntroduction\UpdateCarIntroductionStep2Request;
use App\Http\Requests\CarIntroduction\UpdateCarIntroductionStep3Request;
use App\Models\Driver;
use App\Models\CarIntroduction as Model;
use App\Models\Introduction;
use App\Models\Tank;
use App\Models\Truck;
use App\Packages\JsonResponse;
use App\Services\CarIntroductionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CarIntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public CarIntroductionService $service)
    {
        parent::__construct($response);
    }

    public function getAddCarIntroductionProps(Introduction $introduction): HttpJsonResponse
    {
        return $this->onItems($this->service->getCarIntroductionProps($introduction));
    }

    public function store(Introduction $introduction, Driver $driver, Truck $truck, Tank $tank): HttpJsonResponse
    {
        return $this->onStore($this->service->store($introduction->id, $driver->id, $truck->id, $tank->id));
    }

    public function update(Model $model, Driver $driver, Truck $truck, Tank $tank): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $driver->id, $truck->id, $tank->id));
    }

    public function updateStep2(Model $model, UpdateCarIntroductionStep2Request $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->updateStep2($model, $request->registry_date, $request->remittance_name, $request->loading_date, $request->loading_tonnage, $request->carrier_unit_usd, $request->carrier_total_usd, $request->carrier_unit_irr, $request->carrier_total_irr, $request->owner_total_usd, $request->owner_total_irr, $request->carrier_loading_commission, $request->forwarding_loading_commission));
    }

    public function updateStep3(Model $model, UpdateCarIntroductionStep3Request $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->updateStep3($model, $request->unloading_date, $request->unloading_tonnage, $request->difference, $request->allowable_deficit, $request->deficit_or_surplus, $request->unloading_receipt));
    }
}
