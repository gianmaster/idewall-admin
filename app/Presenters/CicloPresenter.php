<?php

namespace App\Presenters;

use App\Transformers\CicloTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CicloPresenter
 *
 * @package namespace App\Presenters;
 */
class CicloPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CicloTransformer();
    }
}
