<?php

namespace App\Http\Requests\Repair;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreRepairRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'repair_date' => 'required',
            'cost' => 'required|numeric|gt:0',
            'description' => 'max:300',
        ];
    }

    public function messages()
    {
        return [
            'repair_date.required' => __('repair.repair_date_required'),
            'cost.required' => __('repair.cost_required'),
            'cost.required' => __('repair.cost_required'),
            'cost.gt' => __('repair.cost_gt'),
            'description.max' => __('repair.description_max'),
        ];
    }
}
