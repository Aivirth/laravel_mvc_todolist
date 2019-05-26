<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;
use Illuminate\Http\Response;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


abstract class FormRequest extends LaravelFormRequest
{

  abstract public function rules();
  abstract public function authorize();

  protected function failedValidation(Validator $validator): void
  {
    $errors = $validator->errors();

    $transformed = [];

    foreach ($errors->messages() as $field => $message) {
      $transformed[] = [
        'field' => $field,
        'message' => $message[0]
      ];
    }

    throw new HttpResponseException(response()->json($transformed, 422));
  }
}
