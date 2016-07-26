<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Docente extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'docentes';

    protected $fillable = ['id', 'nombres', 'apellidos', 'identificacion', 'tipo_identificacion', 'email',
							'email_corporativo', 'celular', 'telefono', 'estado_civil', 'genero', 'titulo_pregrado',
							'titulo_postgrado', 'titulo_mba', 'registro_senescyt', 'fecha_nacimiento', 'nacionalidad',
							'residencia', 'direccion', 'tipo_contrato', 'estado'];


    public function materias(){
    	return $this->HasMany(MateriasDocente::class, 'docente', 'id')->with('materiaDetail')->where('activo', true);
    }

    public function materiasAll(){
    	return $this->HasMany(MateriasDocente::class, 'docente', 'id')->with('materiaDetail');
    }

}
