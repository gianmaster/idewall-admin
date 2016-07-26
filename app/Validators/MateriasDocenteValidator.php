<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class MateriasDocenteValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
        	'materia'	=> 'required',
        	'docente'	=> 'required',
        ],
        ValidatorInterface::RULE_UPDATE => [
        	'id'		=> 'required|unique:materias_docente',
        	'materia'	=> 'required',
        	'docente'	=> 'required',
        ],
   ];
}
