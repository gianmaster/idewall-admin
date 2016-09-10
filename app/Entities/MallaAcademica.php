<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class MallaAcademica extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'malla_academica';

    protected $fillable = ['id', 'codigo_materia', 'nombre_materia', 'semestre', 'horas', 'estado', 'tipo_materia', 'tipo_asignacion'];

    public function descripcionSemestre(){
    	return $this->hasOne('App\Entities\CatalogoItem', 'codigo', 'semestre')->where('catalogo', 2);//catalogo de semestres
    }
    
   
    public function docentes(){
    	return $this->hasMany('App\Entities\MateriasDocente', 'materia', 'id')->where('activo', true);
    }

    public function silabos(){
    	return $this->hasMany(Silabo::class, 'id_materia_malla', 'id')->where('estado', true);
    }
    

}
