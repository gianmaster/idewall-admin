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

}
