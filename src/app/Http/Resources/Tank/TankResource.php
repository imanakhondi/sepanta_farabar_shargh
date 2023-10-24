<?php

namespace App\Http\Resources\Tank;

use Illuminate\Http\Resources\Json\JsonResource;

class TankResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'tankNo' => intval($this->tank_no),
            'psiDate' => $this->psi_date ?? '',
            'testValidityDate' => $this->test_validity_date ?? '',
            'capotageDate' => $this->capotage_date ?? '',
            'companyId' => intval($this->company_id),
            'companyName' => $this->company_name ?? '',
        ];
    }
}
