<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Catalogo;

/**
 * Class CatalogoTransformer
 * @package namespace App\Transformers;
 */
class CatalogoTransformer extends TransformerAbstract
{

    /**
     * Transform the \Catalogo entity
     * @param \Catalogo $model
     *
     * @return array
     */
    public function transform(Catalogo $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */
            'nombre'     => $model->nombre,
            'descripcion'=> $model->descripcion,
            'items'      => $model->items,

            'created_at' => (string)$model->created_at,
            'updated_at' => (string)$model->updated_at
        ];
    }
}
