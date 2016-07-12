<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Rol;

/**
 * Class MenuTransformer
 * @package namespace App\Transformers;
 */
class RolTransformer extends TransformerAbstract
{

    /**
     * Transform the \Rol entity
     * @param \Rol $model
     *
     * @return array
     */
    public function transform(Rol $model)
    {
        $newModel = [
            'id'    => (int) $model->id,
            /* place your other model properties here */
            'name'  => $model->nombre,
            'desc'  => $model->descripcion
        ];

        return $newModel;
    }
}
