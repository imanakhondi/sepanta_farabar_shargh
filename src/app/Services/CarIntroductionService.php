<?php

namespace App\Services;

use App\Http\Resources\Driver\DriverResource;
use App\Http\Resources\Introduction\IntroductionResource;
use App\Http\Resources\Tank\TankResource;
use App\Http\Resources\Truck\TruckResource;
use App\Models\CarIntroduction as Model;
use App\Models\Introduction;

class CarIntroductionService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $introductionId, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_introductions', 'introduction_id', 'tbl_introductions.id')
            ->join('tbl_cities AS tbl_cities_first', 'start_point_id', 'tbl_cities_first.id')
            ->join('tbl_cities AS tbl_cities_end', 'end_point_id', 'tbl_cities_end.id')
            ->join('tbl_drivers', 'driver_id', 'tbl_drivers.id')
            ->join('tbl_tanks', 'tank_id', 'tbl_tanks.id')
            ->join('tbl_trucks', 'truck_id', 'tbl_trucks.id')
            ->select(
                'tbl_car_introductions.*',
                'tbl_drivers.name AS driver_name',
                'tbl_drivers.family AS driver_family',
                'tbl_drivers.national_no AS driver_national_no',
                'tbl_drivers.mobile AS driver_mobile',
                'tbl_tanks.tank_no',
                'tbl_trucks.name AS truck_name',
                'tbl_trucks.family AS truck_family',
                'tbl_trucks.national_no AS truck_national_no',
                'tbl_trucks.mobile AS truck_mobile',
                'tbl_trucks.ir_no AS truck_ir_no',
                'tbl_trucks.transit_no AS truck_transit_no',
                'tbl_cities_first.name AS first_point_name',
                'tbl_cities_end.name AS end_point_name',
            )
            ->where('introduction_id', $introductionId)->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $introductionId, int $driverId, int $truckId, int $tankId): mixed
    {
        $data = [
            'introduction_id' => $introductionId,
            'driver_id' => $driverId,
            'truck_id' => $truckId,
            'tank_id' => $tankId,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, int $driverId, int $truckId, int $tankId): bool
    {
        $data = [
            'driver_id' => $driverId,
            'truck_id' => $truckId,
            'tank_id' => $tankId,
        ];
        return $model->update($data);
    }

    public function updateStep2(Model $model, string $registryDate, ?string $remittanceName, ?string $loadingDate, ?int $loadingTonnage, ?string $carrierUnitUSD, ?int $carrierTotalUSD, ?string $carrierUnitIRR, ?int $carrierTotalIRR, ?int $ownerTotalUSD, ?int $ownerTotalIRR, ?int $carrierLoadingCommission, ?int $forwardingLoadingCommission): bool
    {
        $data = [
            'registry_date' => $registryDate,
            'remittance_name' => $remittanceName ?? '',
            'loading_date' => $loadingDate ?? '',
            'loading_tonnage' => $loadingTonnage ?? 0,
            'carrier_unit_usd' => $carrierUnitUSD ?? '',
            'carrier_total_usd' => $carrierTotalUSD ?? 0,
            'carrier_unit_irr' => $carrierUnitIRR ?? '',
            'carrier_total_irr' => $carrierTotalIRR ?? 0,
            'owner_total_usd' => $ownerTotalUSD ?? 0,
            'owner_total_irr' => $ownerTotalIRR ?? 0,
            'carrier_loading_commission' => $carrierLoadingCommission ?? 0,
            'forwarding_loading_commission' => $forwardingLoadingCommission ?? 0,
        ];
        return $model->update($data);
    }

    public function updateStep3(Model $model, string $unloadingDate, ?int $unloadingTonnage, ?int $difference, ?int $allowableDeficit, ?string $deficitOrSurplus, ?string $unloadingReceipt): bool
    {
        $data = [
            'unloading_date' => $unloadingDate,
            'unloading_tonnage' => $unloadingTonnage ?? 0,
            'difference' => $difference ?? 0,
            'allowable_deficit' => $allowableDeficit ?? 0,
            'deficit_or_surplus' => $deficitOrSurplus ?? 0,
            'unloading_receipt' => $unloadingReceipt ?? '',
        ];
        return $model->update($data);
    }

    public function getCarIntroductionProps(Introduction $introduction): array
    {
        $driverService = new DriverService();
        $truckService = new TruckService();
        $tankService = new TankService();
        $introduction = new IntroductionResource($introduction);
        $drivers = DriverResource::collection($driverService->getAll());
        $trucks = TruckResource::collection($truckService->getAll());
        $tanks = TankResource::collection($tankService->getAll());
        return ['introduction' => $introduction, 'drivers' => $drivers, 'trucks' => $trucks, 'tanks' => $tanks];
    }

    public function count(int $introductionId): int
    {
        return Model::where('introduction_id', $introductionId)->count();
    }
}
