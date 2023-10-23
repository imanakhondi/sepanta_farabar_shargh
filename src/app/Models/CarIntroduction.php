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
        'introduction_id',
        'driver_id',
        'truck_id',
        'tank_id',
        'registry_date',
        'remittance_name',
        'loading_date',
        'loading_tonnage',
        'carrier_unit_usd',
        'carrier_total_usd',
        'carrier_unit_irr',
        'carrier_total_irr',
        'owner_total_usd',
        'owner_total_irr',
        'carrier_loading_commission',
        'forwarding_loading_commission',
        'unloading_date',
        'unloading_tonnage',
        'difference',
        'allowable_deficit',
        'deficit_or_surplus',
        'unloading_receipt',
    ];
}
