<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class MateriasDocente extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'materias_docente';

    protected $fillable = ['docente', 'materia', 'id'];

    public function docenteOwner(){
    	return $this->BelongsTo(Docente::class, 'id', 'docente');
    }

    public function docentes(){
    	return $this->HasMany(Docente::class, 'id', 'docente');
    }

    public function materiaDetail(){
    	return $this->BelongsTo(MallaAcademica::class, 'materia', 'id');
    }

}
