<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\MateriasDocente;

/**
 * Class MateriasDocenteTransformer
 * @package namespace App\Transformers;
 */
class MateriasDocenteTransformer extends TransformerAbstract
{

    /**
     * Transform the \MateriasDocente entity
     * @param \MateriasDocente $model
     *
     * @return array
     */
    public function transform(MateriasDocente $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'materia'   => $model->materia,
            'docente'   => $model->docente,
            'detalle_docente' => $model->docenteOwner,
            'detalle_materia' => $model->materiaDetail,

            'created_at' => (string)$model->created_at,
            'updated_at' => (string)$model->updated_at
        ];
    }
}
