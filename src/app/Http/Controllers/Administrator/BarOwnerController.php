<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\BarOwner\StoreBarOwnerRequest;
use App\Http\Requests\BarOwner\UpdateBarOwnerRequest;
use App\Models\BarOwner as Model;
use App\Packages\JsonResponse;
use App\Services\BarOwnerService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class BarOwnerController extends Controller
{
    public function __construct(JsonResponse $response, public BarOwnerService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreBarOwnerRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->company_name, $request->name, $request->family, $request->mobile));
    }

    public function update(Model $model, UpdateBarOwnerRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->company_name, $request->name, $request->family, $request->mobile));
    }
}
