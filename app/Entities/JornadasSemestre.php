<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
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
    				->where('id_catalogo', 2);
    }

    public function aula(){
    	return $this->hasOne(CatalogoItem::class, 'codigo', 'catalogo_aula')
    				->where('id_catalogo', 4);
    }

    public function jornada(){
    	return $this->hasOne(CatalogoItem::class, 'codigo', 'catalogo_jornada')
    				->where('id_catalogo', 5);
    }

}
