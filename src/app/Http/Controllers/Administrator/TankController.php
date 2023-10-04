<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tank\StoreTankRequest;
use App\Http\Requests\Tank\UpdateTankRequest;
use App\Models\Company;
use App\Models\Tank as Model;
use App\Packages\JsonResponse;
use App\Services\TankService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class TankController extends Controller
{
    public function __construct(JsonResponse $response, public TankService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreTankRequest $request, Company $company): HttpJsonResponse
    {
        return $this->onStore($this->service->store($company->id, $request->tank_no, $request->psi_date, $request->test_validity_date, $request->capotage_date));
    }

    public function update(Model $model, UpdateTankRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->tank_no, $request->psi_date, $request->test_validity_date, $request->capotage_date));
    }
}
