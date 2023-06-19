<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeApplianceUpdateRequest extends FormRequest
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
            'name'=> 'required',
            'description'=> 'required',
            'voltage'=> 'required',
            'brand'=> 'required',
        ];
    }


    public function messages(){

        return [
            'name.required'=> 'O campo nome é obrigatório',
            'description.required'=> 'O campo descrição é obrigatório',
            'voltage.required'=> 'O campo voltagem é obrigatório',
            'brand.required'=> 'O campo marca é obrigatório',
        ];

    }
}
