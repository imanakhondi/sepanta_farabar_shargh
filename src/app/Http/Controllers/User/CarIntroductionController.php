<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CarIntroduction\IndexCarIntroductionsRequest;
use App\Models\CarIntroduction as Model;
use App\Models\Company;
use App\Packages\JsonResponse;
use App\Services\CarIntroductionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CarIntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public CarIntroductionService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexCarIntroductionsRequest $request, Company $company): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($company->id, $request->_pn, $request->_pi), $this->service->count($company->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
