<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class JornadasSemestreValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'catalogo_semestre' => 'required',
            'catalogo_aula'     => 'required',
            'catalogo_jornada'  => 'required',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'catalogo_semestre' => 'required',
            'catalogo_aula'     => 'required',
            'catalogo_jornada'  => 'required',
        ],
   ];
}
