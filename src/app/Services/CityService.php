<?php

namespace App\Services;

use App\Models\City as Model;

class CityService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $name, int $page, int $pageItems): mixed
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public function store(string $name): mixed
    {
        $data = [
            'name' => $name,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, string $name): bool
    {
        $data = [
            'name' => $name,
        ];
        return $model->update($data);
    }

    public function count(string|null $name): int
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->count();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
