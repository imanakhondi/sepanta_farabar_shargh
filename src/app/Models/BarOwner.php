<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BarOwner extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_bar_owners';
    protected $fillable = [
        'company_name',
        'name',
        'family',
        'mobile',
    ];
}
