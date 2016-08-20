<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Ciclo;

/**
 * Class CicloTransformer
 * @package namespace App\Transformers;
 */
class CicloTransformer extends TransformerAbstract
{

    /**
     * Transform the \Ciclo entity
     * @param \Ciclo $model
     *
     * @return array
     */
    public function transform(Ciclo $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'anio'       => $model->anio,
            'ciclo'        => $model->ciclo,

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
