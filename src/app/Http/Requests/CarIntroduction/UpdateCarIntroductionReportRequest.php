<?php

namespace App\Http\Requests\CarIntroduction;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateCarIntroductionReportRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'registry_date' => 'required',
            'unloading_date' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'unloading_date.required' => __('car_introduction.unloading_date_required'),
            'registry_date.required' => __('car_introduction.registry_date_required'),
        ];
    }
}
