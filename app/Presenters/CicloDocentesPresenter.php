<?php

namespace App\Presenters;

use App\Transformers\CicloDocentesTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CicloDocentesPresenter
 *
 * @package namespace App\Presenters;
 */
class CicloDocentesPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CicloDocentesTransformer();
    }
}
