<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Docente;

/**
 * Class DocenteTransformer
 * @package namespace App\Transformers;
 */
class DocenteTransformer extends TransformerAbstract
{

    /**
     * Transform the \Docente entity
     * @param \Docente $model
     *
     * @return array
     */
    public function transform(Docente $model)
    {

        $materias = array();
        foreach ($model->materias as $key => $value) {
            array_push($materias, array(
                'nombre'    => $value->materiaDetail->nombre_materia,
                'semestre'  => $value->materiaDetail->semestre,
                'id'        => $value->materiaDetail->id
            )); 
        }

        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'abreviatura'   => $model->abreviatura,
            'nombres'             => $model->nombres, 
            'apellidos' => $model->apellidos, 
            'identificacion' => $model->identificacion, 
            'tipo_identificacion' => $model->tipo_identificacion, 
            'email' => $model->email, 
            'email_corporativo' => $model->email_corporativo,  
            'celular' => $model->celular, 
            'telefono' => $model->telefono,  
            'estado_civil' => $model->estado_civil, 
            'genero' => $model->genero, 
            'titulo_pregrado' => $model->titulo_pregrado, 
            'titulo_postgrado' => $model->titulo_postgrado, 
            'titulo_mba' => $model->titulo_mba, 
            'registro_senescyt' => $model->registro_senescyt, 
            'fecha_nacimiento'  => $model->fecha_nacimiento, 
            'nacionalidad' => $model->nacionalidad, 
            'residencia' => $model->residencia, 
            'direccion' => $model->direccion, 
            'tipo_contrato' => $model->tipo_contrato, 
            'estado' => $model->estado, 
            'materias' => $materias,
            'materias_all' => $model->materiasAll->toArray(),

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
