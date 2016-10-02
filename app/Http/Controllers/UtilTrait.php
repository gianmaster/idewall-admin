<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Mockery\Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

trait UtilTrait{

	public function validationMessages($messages){

        $finalMessage = array();
        $array = array();

        $i = 0;

        $array = array_flatten($messages);

        foreach($array as $key => $value){
            $finalMessage[$i++] = $value;
        }

        if(!(empty($array)) && count($finalMessage) > 1)
            unset($finalMessage[count($finalMessage)-1]);

        return $finalMessage;
    }


    public function utf8_encode_all($dat){
      if (is_string($dat)) return utf8_encode($dat);
      if (!is_array($dat)) return $dat;
      $ret = array();
      foreach($dat as $i=>$d) $ret[$i] = $this->utf8_encode_all($d);
      return $ret;
    }


 
	/*
	-- =============================================
	-- Author:		Luis Antonio Celis Molina
	-- Create date: 20/03/2010
	-- Description: Limpia cadena y regresa sin acentos
	-- Parametros: @text string con la variable a limpiar
	-- =============================================
	*/

	public function elimina_acentos($text)
    {
        $text = htmlentities($text, ENT_QUOTES, 'UTF-8');
        $text = strtolower($text);
        $patron = array (
            // Espacios, puntos y comas por guion
            //'/[\., ]+/' => ' ',
 
            // Vocales
            '/\+/' => '',
            '/&agrave;/' => 'a',
            '/&egrave;/' => 'e',
            '/&igrave;/' => 'i',
            '/&ograve;/' => 'o',
            '/&ugrave;/' => 'u',
 
            '/&aacute;/' => 'a',
            '/&eacute;/' => 'e',
            '/&iacute;/' => 'i',
            '/&oacute;/' => 'o',
            '/&uacute;/' => 'u',
 
            '/&acirc;/' => 'a',
            '/&ecirc;/' => 'e',
            '/&icirc;/' => 'i',
            '/&ocirc;/' => 'o',
            '/&ucirc;/' => 'u',
 
            '/&atilde;/' => 'a',
            '/&etilde;/' => 'e',
            '/&itilde;/' => 'i',
            '/&otilde;/' => 'o',
            '/&utilde;/' => 'u',
 
            '/&auml;/' => 'a',
            '/&euml;/' => 'e',
            '/&iuml;/' => 'i',
            '/&ouml;/' => 'o',
            '/&uuml;/' => 'u',
 
            '/&auml;/' => 'a',
            '/&euml;/' => 'e',
            '/&iuml;/' => 'i',
            '/&ouml;/' => 'o',
            '/&uuml;/' => 'u',
 
            // Otras letras y caracteres especiales
            '/&aring;/' => 'a',
            '/&ntilde;/' => 'n',
 
            // Agregar aqui mas caracteres si es necesario
 
        );
 
        $text = preg_replace(array_keys($patron),array_values($patron),$text);
        return $text;
    }


    /**
     * @param $data
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginateArray($data, $perPage = 15)
    {
        $page = Paginator::resolveCurrentPage();
        $total = count($data);
        $results = array_slice($data, ($page - 1) * $perPage, $perPage);

        return new LengthAwarePaginator($results, $total, $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
        ]);
    }


}