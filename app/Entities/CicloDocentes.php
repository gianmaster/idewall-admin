<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class CicloDocentes extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'ciclo_docentes';

    protected $fillable = ['id', 'ciclo', 'docente'];

    public function cicloDetail(){
        return $this->hasOne(Ciclo::class, 'id', 'ciclo');
    }

    public function docenteDetail(){
        return $this->hasOne(Docente::class, 'id', 'docente');
    }

    public function materiasDocenteCiclo(){
        return $this->hasMany(MateriasDocente::class, 'materia_docente', 'id');
    }
    
}
