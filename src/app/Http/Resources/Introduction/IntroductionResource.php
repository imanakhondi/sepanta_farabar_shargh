<?php

namespace App\Http\Resources\Introduction;

use Illuminate\Http\Resources\Json\JsonResource;

class IntroductionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'introductionNo' => intval($this->introduction_no),
            'introductionDate' => $this->introduction_date ?? '',
            'barOwnerId' => intval($this->bar_owner_id),
            'barOwnerCompanyName' => $this->bar_owner_company_name,
            'startPointId' => intval($this->start_point_id),
            'startPointName' => $this->start_point_name,
            'endPointId' => intval($this->end_point_id),
            'endPointName' => $this->end_point_name,
            'ownerUnitUSD' => intval($this->owner_unit_usd),
            'ownerUnitIRR' => intval($this->owner_unit_irr),
        ];
    }
}
