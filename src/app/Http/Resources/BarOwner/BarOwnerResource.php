<?php

namespace App\Http\Resources\BarOwner;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class BarOwnerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'companyName' => Helper::localeNumbers($this->company_name),
            'name' => Helper::localeNumbers($this->name),
            'family' => Helper::localeNumbers($this->family),
            'mobile' => $this->mobile,
        ];
    }
}
