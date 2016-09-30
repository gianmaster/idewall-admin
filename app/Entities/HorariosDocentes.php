<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class HorariosDocentes extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'horarios_docentes';

    protected $fillable = ['id','id_distributivo','ciclo_docente','dia','hora_inicio','hora_fin','num_horas'];

}
