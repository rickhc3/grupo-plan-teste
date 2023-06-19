<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
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
            'password'=> ['required'],
            'role'=> ['required'],
        ];
    }


    public function messages(){

        return [
            'name.required'=> 'O campo nome é obrigatório',
            'email.required'=> 'O campo email é obrigatório',
            'password.required'=> 'O campo senha é obrigatório',
            'role.required'=> 'O campo role é obrigatório',
        ];

    }
}
