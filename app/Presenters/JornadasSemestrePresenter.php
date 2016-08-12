<?php

namespace App\Presenters;

use App\Transformers\JornadasSemestreTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class JornadasSemestrePresenter
 *
 * @package namespace App\Presenters;
 */
class JornadasSemestrePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new JornadasSemestreTransformer();
    }
}
