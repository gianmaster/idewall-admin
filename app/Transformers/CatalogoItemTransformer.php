<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\CatalogoItem;

/**
 * Class CatalogoItemTransformer
 * @package namespace App\Transformers;
 */
class CatalogoItemTransformer extends TransformerAbstract
{

    /**
     * Transform the \CatalogoItem entity
     * @param \CatalogoItem $model
     *
     * @return array
     */
    public function transform(CatalogoItem $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'catalogo'      =>(int) $model->catalogo,
            'codigo'        => $model->codigo,
            'descripcion'   => $model->descripcion,
            'orden'         => $model->orden,
            'activo'        => $model->activo,

            'created_at' => (string)$model->created_at,
            'updated_at' => (string)$model->updated_at
        ];
    }
}
