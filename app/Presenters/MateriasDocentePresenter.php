<?php

namespace App\Presenters;

use App\Transformers\MateriasDocenteTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MateriasDocentePresenter
 *
 * @package namespace App\Presenters;
 */
class MateriasDocentePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new MateriasDocenteTransformer();
    }
}
