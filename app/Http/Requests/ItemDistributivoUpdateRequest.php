<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ItemDistributivoUpdateRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_distributivo'   => 'required',
            'nombre'            => 'required|min:3',
            'orden'             => 'numeric',
            'modificable'       => 'boolean',
            'activo'            => 'boolean'
        ];
    }
}
