<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\JornadasSemestre;

/**
 * Class JornadasSemestreTransformer
 * @package namespace App\Transformers;
 */
class JornadasSemestreTransformer extends TransformerAbstract
{

    /**
     * Transform the \JornadasSemestre entity
     * @param \JornadasSemestre $model
     *
     * @return array
     */
    public function transform(JornadasSemestre $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'aula'      => $model->aula,
            'semestre'      => $model->semestre,
            'jornada'      => $model->jornada,
            'ciclo'     => $model->descripcionCiclo,
            'catalogo_aula' => $model->catalogo_aula,
            'catalogo_jornada' => $model->catalogo_jornada,
            'catalogo_semestre' => $model->catalogo_semestre,

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
