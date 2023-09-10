<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\City\IndexCitiesRequest;
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

    public function index(IndexCitiesRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->name, $request->_pn, $request->_pi), $this->service->count($request->name));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
