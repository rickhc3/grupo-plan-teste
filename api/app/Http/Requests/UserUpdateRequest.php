<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'name'=> ['required'],
            'email'=> ['required'],
            'role'=> ['required'],
        ];
    }


    public function messages(){

        return [
            'name.required'=> 'O campo nome é obrigatório',
            'email.required'=> 'O campo email é obrigatório',
            'role.required'=> 'O campo role é obrigatório',
        ];

    }
}
