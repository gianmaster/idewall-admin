<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class RolMenu extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'rol_menu';

    protected $fillable = ['rol', 'menu'];

    public function menu(){
    	return $this->belongsTo('App\Entities\Menu', 'id', 'menu');
    }

    public function rol(){
    	return $this->belongsTo('App\Entities\Rol', 'id', 'rol');
    }

}
