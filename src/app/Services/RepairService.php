<?php

namespace App\Services;

use App\Models\Repair as Model;

class RepairService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $tankId, int $page, int $pageItems): mixed
    {
        return Model::where('tank_id', $tankId)->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $tankId,  string $repairDate, int $cost, string $description): mixed
    {
        $data = [
            'tank_id' => $tankId,
            'repair_date' => $repairDate,
            'cost' => $cost,
            'description' => $description,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, string $repairDate, int $cost, string $description): bool
    {
        $data = [
            'repair_date' => $repairDate,
            'cost' => $cost,
            'description' => $description,
        ];
        return $model->update($data);
    }

    public function count(int $tankId): int
    {
        return Model::where('tank_id', $tankId)->count();
    }
}
