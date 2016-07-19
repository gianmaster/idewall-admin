<?php

namespace App\Presenters;

use App\Transformers\DocenteTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class DocentePresenter
 *
 * @package namespace App\Presenters;
 */
class DocentePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new DocenteTransformer();
    }
}
