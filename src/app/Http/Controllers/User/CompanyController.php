<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\IndexCompaniesRequest;
use App\Models\Company as Model;
use App\Packages\JsonResponse;
use App\Services\CompanyService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CompanyController extends Controller
{
    public function __construct(JsonResponse $response, public CompanyService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexCompaniesRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->name, $request->_pn, $request->_pi), $this->service->count($request->name));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
