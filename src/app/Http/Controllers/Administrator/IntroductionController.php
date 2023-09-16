<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Introduction\StoreIntroductionRequest;
use App\Models\BarOwner;
use App\Models\City;
use App\Models\Introduction as Model;
use App\Packages\JsonResponse;
use App\Services\IntroductionService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class IntroductionController extends Controller
{
    public function __construct(JsonResponse $response, public IntroductionService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreIntroductionRequest $request, BarOwner $barOwner, City $startPoint, City $endPoint): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->introduction_no, $request->introduction_date, $barOwner->id, $startPoint->id, $endPoint->id, $request->owner_unit_usd, $request->owner_unit_irr));
    }
}
