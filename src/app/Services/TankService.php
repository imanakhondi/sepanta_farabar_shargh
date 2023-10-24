<?php

namespace App\Services;

use App\Models\Tank as Model;

class TankService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $companyId, int $page, int $pageItems): mixed
    {
        return Model::where('company_id', $companyId)->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(): mixed
    {
        return Model::join('tbl_companies', 'company_id', 'tbl_companies.id')->select('tbl_tanks.*', 'tbl_companies.name AS company_name')->orderBy('tbl_tanks.id', 'ASC')->get();
    }

    public function store(int $companyId, int $tankNo, string $psiDate, string $testValidityDate, string $capotageDate): mixed
    {
        $data = [
            'company_id' => $companyId,
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

    public function count(int $companyId): int
    {
        return Model::where('company_id', $companyId)->count();
    }
}
