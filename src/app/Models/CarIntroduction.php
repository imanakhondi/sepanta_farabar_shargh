<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarIntroduction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_car_introductions';
    protected $fillable = [
        'driver_id',
        'truck_id',
        'tank_id',
    ];
}
