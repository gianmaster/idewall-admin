<?php

namespace App\Presenters;

use App\Transformers\MateriasCicloDocenteTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MateriasDocentePresenter
 *
 * @package namespace App\Presenters;
 */
class MateriasCicloDocentePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new MateriasCicloDocenteTransformer();
    }
}
