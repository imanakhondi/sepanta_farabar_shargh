<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Introduction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_introductions';
    protected $fillable = [
        'introduction_no',
        'introduction_date',
        'bar_owner_id',
        'start_point_id',
        'end_point_id',
        'owner_unit_usd',
        'owner_unit_irr',
    ];
}
