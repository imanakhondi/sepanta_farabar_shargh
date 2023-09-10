<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\City\StoreCityRequest;
use App\Http\Requests\City\UpdateCityRequest;
use App\Models\City as Model;
use App\Packages\JsonResponse;
use App\Services\CityService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CityController extends Controller
{
    public function __construct(JsonResponse $response, public CityService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreCityRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name));
    }

    public function update(Model $model, UpdateCityRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name));
    }
}
