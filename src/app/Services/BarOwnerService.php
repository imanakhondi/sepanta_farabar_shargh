<?php

namespace App\Services;

use App\Models\BarOwner as Model;

class BarOwnerService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $companyName, int $page, int $pageItems): mixed
    {
        return Model::where('company_name', 'LIKE', '%' . $companyName . '%')->orderBy('company_name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('company_name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public function store(string $companyName, string $name, string $family, string $mobile): mixed
    {
        $data = [
            'company_name' => $companyName,
            'name' => $name,
            'family' => $family,
            'mobile' => $mobile,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, string $companyName, string $name, string $family, string $mobile): bool
    {
        $data = [
            'company_name' => $companyName,
            'name' => $name,
            'family' => $family,
            'mobile' => $mobile,
        ];
        return $model->update($data);
    }

    public function count(string|null $companyName): int
    {
        return Model::where('company_name', 'LIKE', '%' . $companyName . '%')->count();
    }
}
