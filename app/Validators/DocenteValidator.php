<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class DocenteValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
        	'nombres'             	=> 'required|max:255', 
            'apellidos' 		  	=> 'required|max:255',
            'identificacion' 		=> 'required|min:9|max:25|unique:docentes', 
            'tipo_identificacion' 	=> 'required|in:CEDULA,RUC,PASAPORTE', 
            'email' 				=> 'required|email|unique:docentes', 
            'email_corporativo' 	=> 'email|unique:docentes,email_corporativo',
            'celular' 				=> 'required|min:9|max:13', 
            'telefono' 				=> 'min:7|max:13',  
            'estado_civil' 			=> 'required|in:SOLTERO,CASADO,VIUDO,DIVORCIADO', 
            'genero' 				=> 'required|in:MASCULINO,FEMENINO', 
            'titulo_pregrado' 		=> 'max:255', 
            'titulo_postgrado' 		=> 'max:255', 
            'titulo_mba' 			=> 'max:255',  
            'registro_senescyt' 	=> 'max:255',  
            'fecha_nacimiento'  	=> 'required|date', 
            'nacionalidad' 			=> 'max:255', 
            'residencia' 			=> 'max:255',  
            'direccion' 			=> 'max:255', 
            'tipo_contrato'			=> 'required|in:TIEMPO_COMPLETO,MEDIO_TIEMPO'
        ],
        ValidatorInterface::RULE_UPDATE => [
        	'nombres'             	=> 'required|max:255', 
            'apellidos' 		  	=> 'required|max:255',
            'identificacion' 		=> 'required|min:9|max:25|unique:docentes', 
            'tipo_identificacion' 	=> 'required|in:CEDULA,RUC,PASAPORTE', 
            'email' 				=> 'required|email|unique:docentes' , 
            'email_corporativo' 	=> 'email|unique:docentes,email_corporativo' ,
            'celular' 				=> 'required|min:9|max:13', 
            'telefono' 				=> 'min:7|max:13',  
            'estado_civil' 			=> 'required|in:SOLTERO,CASADO,VIUDO,DIVORCIADO', 
            'genero' 				=> 'required|in:MASCULINO,FEMENINO', 
            'titulo_pregrado' 		=> 'max:255', 
            'titulo_postgrado' 		=> 'max:255', 
            'titulo_mba' 			=> 'max:255',  
            'registro_senescyt' 	=> 'max:255',  
            'fecha_nacimiento'  	=> 'required|date',
            'nacionalidad' 			=> 'max:255', 
            'residencia' 			=> 'max:255',  
            'direccion' 			=> 'max:255', 
            'tipo_contrato'			=> 'required|in:TIEMPO_COMPLETO,MEDIO_TIEMPO'
        ],
   ];
}
