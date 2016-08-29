<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class MateriasDocente extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'ciclo_materias_docente';

    protected $fillable = ['ciclo_docente', 'materia', 'id', 'activo'];


    public function materiaDetail(){
        return $this->BelongsTo(MallaAcademica::class, 'materia', 'id')->where('activo', true);
    }

    public function materiaDetailAll(){
        return $this->BelongsTo(MallaAcademica::class, 'materia', 'id');
    }

    public function decenteDetail(){
        return $this->belongsTo(CicloDocentes::class, 'id', 'ciclo_docente');
    }

}
