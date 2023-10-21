<?php

namespace App\Services;

use App\Models\CarIntroduction as Model;

class CarIntroductionService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $companyId, int $page, int $pageItems): mixed
    {
        return Model::where('company_id', $companyId)->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $driverId, int $truckId, int $tankId): mixed
    {
        $data = [
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

    public function count(int $companyId): int
    {
        return Model::where('company_id', $companyId)->count();
    }
}
