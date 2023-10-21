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

    public function update(Model $model, int $tankNo, string $psiDate, string $testValidityDate, string $capotageDate): bool
    {
        $data = [
            'tank_no' => $tankNo,
            'psi_date' => $psiDate,
            'test_validity_date' => $testValidityDate,
            'capotage_date' => $capotageDate,
        ];
        return $model->update($data);
    }

    public function count(int $companyId): int
    {
        return Model::where('company_id', $companyId)->count();
    }
}