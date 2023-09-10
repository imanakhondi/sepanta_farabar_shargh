<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\BarOwner\IndexBarOwnersRequest;
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

    public function index(IndexBarOwnersRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->company_name, $request->_pn, $request->_pi), $this->service->count($request->company_name));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
