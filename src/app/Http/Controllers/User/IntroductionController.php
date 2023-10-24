<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Introduction\IndexIntroductionsRequest;
use App\Http\Resources\BarOwner\BarOwnerResource;
use App\Http\Resources\City\CityResource;
use App\Models\Introduction as Model;
use App\Packages\JsonResponse;
use App\Services\BarOwnerService;
use App\Services\CityService;
use App\Services\IntroductionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class IntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public IntroductionService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexIntroductionsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->count());
    }

    public function getIntroductionProps(): HttpJsonResponse
    {
        $barOwnerService = new BarOwnerService();
        $barOwners = BarOwnerResource::collection($barOwnerService->getAll());
        $cityService = new CityService();
        $cities = CityResource::collection($cityService->getAll());
        return $this->onItems(['barOwners' => $barOwners, 'cities' => $cities]);
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
