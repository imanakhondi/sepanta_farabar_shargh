<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tank extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_tanks';
    protected $fillable = [
        'company_id',
        'tank_no',
        'psi_date',
        'test_validity_date',
        'capotage_date',
    ];
}
