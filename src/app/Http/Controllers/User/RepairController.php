<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Repair\IndexRepairsRequest;
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

    public function index(IndexRepairsRequest $request, Tank $tank): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($tank->id, $request->_pn, $request->_pi), $this->service->count($tank->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
