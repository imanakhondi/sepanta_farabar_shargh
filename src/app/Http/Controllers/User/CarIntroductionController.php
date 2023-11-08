<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CarIntroduction\IndexCarIntroductionsRequest;
use App\Http\Resources\CarIntroduction\CarIntroductionResource;
use App\Models\CarIntroduction as Model;
use App\Models\Introduction;
use App\Packages\JsonResponse;
use App\Services\CarIntroductionService;
use App\Services\IntroductionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CarIntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public CarIntroductionService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexCarIntroductionsRequest $request, Introduction $introduction): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($introduction->id, $request->_pn, $request->_pi), $this->service->count($introduction->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        $carIntroduction = new CarIntroductionResource($this->service->get($model->id));
        $introductionService = new IntroductionService();
        $introduction = $introductionService->get($carIntroduction->introduction_id);
        $props = $this->service->getCarIntroductionProps($introduction);
        $items = ['item' => $carIntroduction];
        foreach ($props as $key => $value) {
            $items[$key] = $value;
        }
        return $this->onOk($items);
    }
}
