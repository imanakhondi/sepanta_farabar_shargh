<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Repair extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_repairs';
    protected $fillable = [
        'repair_date',
        'cost',
        'description',
        'tank_id',
    ];
}
