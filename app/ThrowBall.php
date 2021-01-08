<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ThrowBall extends Model
{
    //
    protected $table = 'throws';
    protected $fillable = ['game_id', 'time', 'angle', 'power'];
}
