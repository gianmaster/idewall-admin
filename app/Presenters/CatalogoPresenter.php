<?php

namespace App\Presenters;

use App\Transformers\CatalogoTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CatalogoPresenter
 *
 * @package namespace App\Presenters;
 */
class CatalogoPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CatalogoTransformer();
    }
}
