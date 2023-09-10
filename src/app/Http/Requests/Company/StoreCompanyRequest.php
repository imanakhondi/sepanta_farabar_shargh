<?php

namespace App\Http\Requests\Company;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreCompanyRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:2|max:50',
            'mobile' => 'required|digits:11|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('company.name_required'),
            'name.min' => __('company.name_min'),
            'name.max' => __('company.name_max'),
            'mobile.required' => __('company.mobile_required'),
            'mobile.digits' => __('company.mobile_digits'),
            'mobile.gt' => __('company.mobile_gt'),
        ];
    }
}
