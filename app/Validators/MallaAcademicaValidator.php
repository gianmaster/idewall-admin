<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class MallaAcademicaValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'nombre_materia'    => 'required|max:255',
            'codigo_materia'    => 'required|min:2|max:255',
            'semestre'          => 'required',
            'horas'             => 'required|numeric',
            'estado'            => 'required',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'nombre_materia'    => 'required|max:255',
            'codigo_materia'    => 'required|min:2|max:255',
            'semestre'          => 'required',
            'horas'             => 'required|numeric',
            'estado'            => 'required',
        ],
   ];
}
