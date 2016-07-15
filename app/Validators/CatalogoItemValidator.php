<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class CatalogoItemValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'catalogo'      => 'required|numeric',
            'codigo'        => 'required|max:255',
            'descripcion'   => 'required|max:255',
            'orden'         => 'numeric',
            'activo'        => 'boolean',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'catalogo'      => 'required|numeric',
            'codigo'        => 'required|max:255',
            'descripcion'   => 'required|max:255',
            'orden'         => 'numeric',
            'activo'        => 'boolean',
        ],
   ];
}
