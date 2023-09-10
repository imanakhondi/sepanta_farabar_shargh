<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
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

    public function store(StoreCompanyRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name, $request->mobile));
    }

    public function update(Model $model, UpdateCompanyRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->mobile));
    }
}
