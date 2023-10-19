<?php

namespace App\Http\Resources\CarIntroduction;

use Illuminate\Http\Resources\Json\JsonResource;

class CarIntroductionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'driverId' => intval($this->driver_id),
            'truckId' => intval($this->truck_id),
            'tankId' => intval($this->tank_id),
        ];
    }
}
