<?php

namespace App\Services;

use App\Models\Tank as Model;

class TankService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $tankNo, string $psiDate, string $testValidityDate, string $capotageDate): mixed
    {
        $data = [
            'tank_no' => $tankNo,
            'psi_date' => $psiDate,
            'test_validity_date' => $testValidityDate,
            'capotage_date' => $capotageDate,
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

    public function count(): int
    {
        return Model::count();
    }
}
