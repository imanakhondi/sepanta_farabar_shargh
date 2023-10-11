<?php

namespace App\Http\Resources\Repair;

use Illuminate\Http\Resources\Json\JsonResource;

class RepairResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'repairDate' => $this->repair_date ?? '',
            'cost' => intval($this->cost),
            'description' => $this->description ?? '',
            'tankId' => intval($this->tank_id),
        ];
    }
}
