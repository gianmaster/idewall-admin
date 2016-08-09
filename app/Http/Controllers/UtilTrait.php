<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Mockery\Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

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

}