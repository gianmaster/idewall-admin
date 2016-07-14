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

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
