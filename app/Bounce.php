<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bounce extends Model
{
    //
    protected $fillable = ['throw_id', 'x', 'y', 'speed'];
}
