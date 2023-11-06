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
            'driverMobile' => $this->driver_mobile ?? '',
            'truckId' => intval($this->truck_id),
            'truckName' => $this->truck_name ?? '',
            'truckFamily' => $this->truck_family ?? '',
            'truckNationalNo' => $this->truck_national_no ?? '',
            'truckMobile' => $this->truck_mobile ?? '',
            'truckIrlNo' => $this->truck_ir_no ?? '',
            'truckTransitNo' => $this->truck_transit_no ?? '',
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
            'unloadingDate' => $this->unloading_date ?? '',
            'unloadingTonnage' => intval($this->unloading_tonnage),
            'difference' => intval($this->difference),
            'allowableDeficit' => intval($this->allowable_deficit),
            'deficitOrSurplus' => intval($this->deficit_or_surplus),
            'unloadingReceipt' => $this->unloading_receipt ?? '',
            'firstPointName' => $this->first_point_name ?? '',
            'endPointName' => $this->end_point_name ?? '',
        ];
    }
}
