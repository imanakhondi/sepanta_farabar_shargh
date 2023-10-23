<?php

namespace App\Http\Resources\CarIntroduction;

use Illuminate\Http\Resources\Json\JsonResource;

class CarIntroductionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'introductionId' => intval($this->introduction_id),
            'driverId' => intval($this->driver_id),
            'driverName' => $this->driver_name ?? '',
            'driverFamily' => $this->driver_family ?? '',
            'driverNationalNo' => $this->driver_national_no ?? '',
            'truckId' => intval($this->truck_id),
            'irlNo' => $this->ir_no ?? '',
            'transitNo' => $this->transit_no ?? '',
            'tankId' => intval($this->tank_id),
            'tankNo' => intval($this->tank_no),
            'registryDate' => $this->registry_date ?? '',
            'remittanceName' => $this->remittance_name ?? '',
            'loadingDate' => $this->loading_date ?? '',
            'loadingTonnage' => intval($this->loading_tonnage),
            'carrierUnitUSD' => $this->carrier_unit_usd ?? '',
            'carrierTotalUSD' => intval($this->carrier_total_usd),
            'carrierUnitIRR' => $this->carrier_unit_irr ?? '',
            'carrierTotalIRR' => intval($this->carrier_total_irr),
            'ownerTotalUSD' => intval($this->owner_total_usd),
            'ownerTotalIRR' => intval($this->owner_total_irr),
            'carrierLoadingCommission' => intval($this->carrier_loading_commission),
            'forwardingLoadingCommission' => intval($this->forwarding_loading_commission),
            'unloading_date' => $this->unloadingDate ?? '',
            'difference' => intval($this->difference),
            'allowable_deficit' => intval($this->allowableDeficit),
            'deficit_or_surplus' => intval($this->deficitOrSurplus),
            'unloading_receipt' => $this->unloadingReceipt ?? '',
        ];
    }
}
