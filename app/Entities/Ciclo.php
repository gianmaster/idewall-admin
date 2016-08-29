<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Ciclo extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'ciclos';

    protected $fillable = ['id', 'anio', 'ciclo', 'estado'];


    public function cursos(){
        return $this->hasMany(JornadasSemestre::class, 'ciclo', 'id');
    }

    public function docentes(){
        return $this->hasMany(CicloDocentes::class, 'ciclo', 'id')
            ->with('cicloDetail')
            ->with('materiasDocenteCiclo')
            ->with('docenteDetail');
    }

}
