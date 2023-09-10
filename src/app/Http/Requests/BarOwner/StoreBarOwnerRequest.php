<?php

namespace App\Http\Requests\BarOwner;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreBarOwnerRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'company_name' => 'required|min:2|max:50',
            'name' => 'required|min:2|max:50',
            'family' => 'required|min:2|max:50',
            'mobile' => 'required|digits:11|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'company_name.required' => __('bar_owner.company_name_required'),
            'company_name.min' => __('bar_owner.company_name_min'),
            'company_name.max' => __('bar_owner.company_name_max'),
            'name.required' => __('bar_owner.name_required'),
            'name.min' => __('bar_owner.name_min'),
            'name.max' => __('bar_owner.name_max'),
            'family.required' => __('bar_owner.family_required'),
            'family.min' => __('bar_owner.family_min'),
            'family.max' => __('bar_owner.family_max'),
            'mobile.required' => __('bar_owner.mobile_required'),
            'mobile.digits' => __('bar_owner.mobile_digits'),
            'mobile.gt' => __('bar_owner.mobile_gt'),
        ];
    }
}
