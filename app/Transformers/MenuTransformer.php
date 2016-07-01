<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Menu;

/**
 * Class MenuTransformer
 * @package namespace App\Transformers;
 */
class MenuTransformer extends TransformerAbstract
{

    /**
     * Transform the \Menu entity
     * @param \Menu $model
     *
     * @return array
     */
    public function transform(Menu $model)
    {
        return [
            'id'         => (int) $model->id,
            /* place your other model properties here */
            'name'       => $model->titulo,
            'link'       => $model->url,
            'iconClass' => $model->iconclass,
            'orden'     => $model->orden,
            'cod_padre' => $model->cod_padre,
            'children' => $model->children,
            'fecha_creacion' => (string)($model->created_at),
            'fecha_modificacion' => (string)$model->updated_at
        ];
    }
}