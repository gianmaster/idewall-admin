<?php

namespace App\Presenters;

use App\Transformers\MallaAcademicaTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MallaAcademicaPresenter
 *
 * @package namespace App\Presenters;
 */
class MallaAcademicaPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new MallaAcademicaTransformer();
    }
}
