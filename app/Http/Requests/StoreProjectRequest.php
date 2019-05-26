<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProjectRequest extends FormRequest
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
      'title'         => ['required', 'min:3'],
      'description'   => 'required|min:10',
      'user_id'       => 'required'
    ];
  }

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
