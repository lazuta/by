<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlightRequest extends FormRequest
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
            'throw_id' => 'required|exists:throws,id',
            'speed' => 'required|numeric|min:0',
            'x' => 'required|numeric|min:0',
            'y' => 'required|numeric|min:0',
        ];
    }
}
