<?php

namespace App\Transformers;

use Illuminate\Support\Facades\Auth;
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
        /*
         * Se valida en el transformer el menu de cada usuario segun su sesion
         */

        $newModel = [];

        if(isset($model->rolMenu)){

            if ($model->rolMenu->rol >= Auth::user()->rol){

                $newModel = [
                    'id'         => (int) $model->id,
                    /* place your other model properties here */
                    'name'       => $model->titulo,
                    'link'       => $model->url,
                    'iconClass' => $model->iconclass,
                    'orden'     => $model->orden,
                    'cod_padre' => $model->cod_padre,
                    'children' => $model->children,
                    'fecha_creacion' => (string)($model->created_at),
                    'fecha_modificacion' => (string)$model->updated_at,
                    'cod_rol' => $model->rolMenu
                ];

                if (isset($newModel['children'])) {//convierto los hijos en transformaciones
                    foreach ($newModel['children'] as $key => $value) {
                        $newModel['children'][$key] = $this->transform($value);
                    }
                }

            }
        }

        /*
        $newModel = [
                    'id'         => (int) $model->id,
                    'name'       => $model->titulo,
                    'link'       => $model->url,
                    'iconClass' => $model->iconclass,
                    'orden'     => $model->orden,
                    'cod_padre' => $model->cod_padre,
                    'children' => $model->children,
                    'fecha_creacion' => (string)($model->created_at),
                    'fecha_modificacion' => (string)$model->updated_at,
                    'cod_rol' => $model->rolMenu
                ];
        */

        return $newModel;
    }
}
