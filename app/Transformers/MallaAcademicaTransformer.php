<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\MallaAcademica;

/**
 * Class MallaAcademicaTransformer
 * @package namespace App\Transformers;
 */
class MallaAcademicaTransformer extends TransformerAbstract
{

    /**
     * Transform the \MallaAcademica entity
     * @param \MallaAcademica $model
     *
     * @return array
     */
    public function transform(MallaAcademica $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'codigo_materia' => $model->codigo_materia,
            'nombre_materia' => $model->nombre_materia,
            'semestre'      => $model->semestre,
            'horas'         => $model->horas,
            'estado'        => $model->estado,

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
