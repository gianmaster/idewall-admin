<?php

namespace App\Presenters;

use App\Transformers\HorariosCursosTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class HorariosCursosPresenter
 *
 * @package namespace App\Presenters;
 */
class HorariosCursosPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new HorariosCursosTransformer();
    }
}
