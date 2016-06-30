<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Rol extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'roles';

    protected $fillable = ['nombre', 'descripcion'];

}
