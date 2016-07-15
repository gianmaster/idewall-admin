<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Menu extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'menu';
    
    protected $fillable = ['nombre', 'titulo', 'url', 'iconclass', 'cod_padre', 'orden'];

   	public function children(){
   		return $this->hasMany(Menu::class, 'cod_padre', 'id')->orderBy('orden');
   	}

   	public function rolMenu(){
   		return $this->hasOne(RolMenu::class, 'menu', 'id');
   	}

}
