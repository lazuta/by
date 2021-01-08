<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    //
    protected $fillable = ['throw_id', 'x', 'y', 'speed'];
}
