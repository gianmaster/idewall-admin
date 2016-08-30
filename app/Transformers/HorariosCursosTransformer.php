<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\HorariosCursos;

/**
 * Class HorariosCursosTransformer
 * @package namespace App\Transformers;
 */
class HorariosCursosTransformer extends TransformerAbstract
{

    /**
     * Transform the \HorariosCursos entity
     * @param \HorariosCursos $model
     *
     * @return array
     */
    public function transform(HorariosCursos $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
