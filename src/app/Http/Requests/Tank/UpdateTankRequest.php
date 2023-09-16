<?php

namespace App\Http\Requests\Tank;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateTankRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'tank_no' => 'required|numeric|gt:0',
            'psi_date' => 'required',
            'test_validity_date' => 'required',
            'capotage_date' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'tank_no.required' => __('tank.tank_no_required'),
            'tank_no.required' => __('tank.tank_no_required'),
            'tank_no.gt' => __('tank.tank_no_gt'),
            'psi_date.required' => __('tank.psi_date_required'),
            'test_validity_date.required' => __('tank.test_validity_date_required'),
            'capotage_date.required' => __('tank.capotage_date_required'),
        ];
    }
}
