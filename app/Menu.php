<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
	protected $table = 'menu';
    //
    protected $fillable = ['nombre', 'titulo', 'url', 'iconclass', 'cod_padre', 'orden'];

    protected $hidden = [''];
}
