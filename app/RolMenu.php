<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RolMenu extends Model
{
	protected $table = 'rol_menu';

    protected $fillable = ['menu', 'rol', 'id'];

    protected $hidden = [''];
}
