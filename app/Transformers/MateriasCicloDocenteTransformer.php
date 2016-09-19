<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\MateriasCicloDocente;

/**
 * Class MateriasDocenteTransformer
 * @package namespace App\Transformers;
 */
class MateriasCicloDocenteTransformer extends TransformerAbstract
{

    /**
     * Transform the \MateriasDocente entity
     * @param \MateriasCicloDocente $model
     *
     * @return array
     */
    public function transform(MateriasCicloDocente $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'materia'   => $model->materia,
            'docente'   => $model->docente,
            'detalle_docente' => $model->docenteOwner,
            'detalle_materia' => $model->materiaDetail,
            'ciclo'     => $model->ciclo,
            'detalle_ciclo' => $model->cicloDetail,

            'created_at' => (string)$model->created_at,
            'updated_at' => (string)$model->updated_at
        ];
    }
}
