<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Ciclo extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'ciclos';

    protected $fillable = ['id', 'periodo', 'nombre', 'estado'];

}
