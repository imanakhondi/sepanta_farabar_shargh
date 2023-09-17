<?php

namespace App\Http\Requests\Introduction;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreIntroductionRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'introduction_no' => 'required|numeric|gt:0',
            'introduction_date' => 'required',
            'owner_unit_usd' => 'required|numeric|gt:0',
            'owner_unit_irr' => 'required|numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'introduction_no.required' => __('introduction.introduction_no_required'),
            'introduction_no.numeric' => __('introduction.introduction_no_numeric'),
            'introduction_no.gt' => __('introduction.introduction_no_gt'),
            'introduction_date.required' => __('introduction.introduction_date_required'),
            'owner_unit_usd.required' => __('introduction.owner_unit_usd_required'),
            'owner_unit_usd.numeric' => __('introduction.owner_unit_usd_numeric'),
            'owner_unit_usd.gt' => __('introduction.owner_unit_usd_gt'),
            'owner_unit_irr.required' => __('introduction.owner_unit_irr_required'),
            'owner_unit_irr.numeric' => __('introduction.owner_unit_irr_numeric'),
            'owner_unit_irr.gt' => __('introduction.owner_unit_irr_gt'),
        ];
    }
}
