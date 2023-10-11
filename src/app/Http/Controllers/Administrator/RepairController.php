<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Repair\StoreRepairRequest;
use App\Http\Requests\Repair\UpdateRepairRequest;
use App\Models\Repair as Model;
use App\Models\Tank;
use App\Packages\JsonResponse;
use App\Services\RepairService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class RepairController extends Controller
{
    public function __construct(JsonResponse $response, public RepairService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreRepairRequest $request, Tank $tank): HttpJsonResponse
    {
        return $this->onStore($this->service->store($tank->id, $request->repair_date, $request->cost, $request->description));
    }

    public function update(Model $model, UpdateRepairRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->repair_date, $request->cost, $request->description));
    }
}
