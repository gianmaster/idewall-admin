<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class CicloLayoutReporte extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'ciclo_layout_reportes';

    protected $fillable = ['id', 'ciclo', 'tipo', 'cabecera', 'pie', 'director_carrera', 'elaborador'];

}

