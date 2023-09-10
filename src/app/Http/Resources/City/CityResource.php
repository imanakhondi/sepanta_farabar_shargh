<?php

namespace App\Http\Resources\City;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name),
            'mobile' => $this->mobile,
        ];
    }
}
