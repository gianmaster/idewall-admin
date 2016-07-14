<?php

namespace App\Presenters;

use App\Transformers\CatalogoItemTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CatalogoItemPresenter
 *
 * @package namespace App\Presenters;
 */
class CatalogoItemPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CatalogoItemTransformer();
    }
}
