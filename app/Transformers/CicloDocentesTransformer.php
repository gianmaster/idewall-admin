<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\CicloDocentes;

/**
 * Class CicloDocentesTransformer
 * @package namespace App\Transformers;
 */
class CicloDocentesTransformer extends TransformerAbstract
{

    /**
     * Transform the \CicloDocentes entity
     * @param \CicloDocentes $model
     *
     * @return array
     */
    public function transform(CicloDocentes $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
