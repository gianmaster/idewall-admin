<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class JornadasSemestre extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'jornadas_semestres';

    protected $fillable = ['id', 'ciclo','catalogo_semestre','catalogo_aula','catalogo_jornada'];

    public function descripcionCiclo(){
    	return $this->hasOne(Ciclo::class, 'id', 'ciclo');
    }

    public function semestre(){
    	return $this->hasOne(CatalogoItem::class, 'codigo', 'catalogo_semestre')
    				->where('catalogo', 2)
                    ->where('activo', true);
    }

    public function aula(){
    	return $this->hasOne(CatalogoItem::class, 'codigo', 'catalogo_aula')
    				->where('catalogo', 4)
                    ->where('activo', true);
    }

    public function jornada(){
    	return $this->hasOne(CatalogoItem::class, 'codigo', 'catalogo_jornada')
    				->where('catalogo', 5)
                    ->where('activo', true);
    }

    public function materiasSemestre(){
        return $this->hasMany(MallaAcademica::class, 'semestre', 'catalogo_semestre')->where('estado', 'VIGENTE');
    }

    public function horario(){
        return $this->hasMany(HorariosCursos::class, 'ciclo_jornada_semestre', 'id');
    }

    public function materiasDocentesQry(){
        return DB::select("select d.abreviatura, d.nombres, d.apellidos, ma.semestre, cmd.id ciclo_materia_docente, ma.nombre_materia, ma.codigo_materia, ma.id id_materia, ma.estado estado_materia
      from docentes d, ciclo_docentes cd, malla_academica ma, ciclo_materias_docente cmd, jornadas_semestres js
      where js.id = $this->id
            AND js.ciclo = cd.ciclo
            AND cd.docente = d.id
            AND cmd.ciclo_docente = cd.id
            and cmd.materia = ma.id
            AND ma.semestre = js.catalogo_semestre
            AND ma.estado = 'VIGENTE'
            ");
    }

}
