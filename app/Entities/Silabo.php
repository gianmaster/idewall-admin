<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Silabo extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['id', 'ruta', 'created_at', 'updated_at', 'activo', 'id_materia_malla'];

}
