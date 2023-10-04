<?php

namespace App\Services;

use App\Models\Introduction as Model;

class IntroductionService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_bar_owners', 'tbl_introductions.bar_owner_id', 'tbl_bar_owners.id')
            ->join('tbl_cities AS tbl_start_cities', 'tbl_introductions.start_point_id', 'tbl_start_cities.id')
            ->join('tbl_cities AS tbl_end_cities', 'tbl_introductions.end_point_id', 'tbl_end_cities.id')
            ->where('tbl_introductions.id', $id)
            ->select('tbl_introductions.*', 'tbl_bar_owners.company_name AS bar_owner_company_name', 'tbl_start_cities.name AS start_point_name', 'tbl_end_cities.name AS end_point_name')
            ->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::join('tbl_bar_owners', 'tbl_introductions.bar_owner_id', 'tbl_bar_owners.id')
            ->join('tbl_cities AS tbl_start_cities', 'tbl_introductions.start_point_id', 'tbl_start_cities.id')
            ->join('tbl_cities AS tbl_end_cities', 'tbl_introductions.end_point_id', 'tbl_end_cities.id')
            ->select('tbl_introductions.*', 'tbl_bar_owners.company_name AS bar_owner_company_name', 'tbl_start_cities.name AS start_point_name', 'tbl_end_cities.name AS end_point_name')
            ->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $introductionNo, string $introductionDate, int $barOwnerId, int $startPointId, int $endPointId, int $ownerUnitUSD, int $ownerUnitIRR): mixed
    {
        $data = [
            'introduction_no' => $introductionNo,
            'introduction_date' => $introductionDate,
            'bar_owner_id' => $barOwnerId,
            'start_point_id' => $startPointId,
            'end_point_id' => $endPointId,
            'owner_unit_usd' => $ownerUnitUSD,
            'owner_unit_irr' => $ownerUnitIRR,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, int $introductionNo, string $introductionDate, int $barOwnerId, int $startPointId, int $endPointId, string $ownerUnitUSD, string $ownerUnitIRR): bool
    {
        $data = [
            'introduction_no' => $introductionNo,
            'introduction_date' => $introductionDate,
            'bar_owner_id' => $barOwnerId,
            'start_point' => $startPointId,
            'end_point' => $endPointId,
            'owner_unit_usd' => $ownerUnitUSD,
            'owner_unit_irr' => $ownerUnitIRR,
        ];
        return $model->update($data);
    }

    public function count(): int
    {
        return Model::join('tbl_bar_owners', 'tbl_introductions.bar_owner_id', 'tbl_bar_owners.id')
            ->join('tbl_cities AS tbl_start_cities', 'tbl_introductions.start_point_id', 'tbl_start_cities.id')
            ->join('tbl_cities AS tbl_end_cities', 'tbl_introductions.end_point_id', 'tbl_end_cities.id')
            ->count();
    }
}
