<?php

namespace App\Http\Requests;


use App\Http\Requests\FormRequest;

class CreateUserRequest extends FormRequest
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
      'title'        => ['string', 'min:3'],
      'password'     => ['string', 'min:3'],
      'email'        => ['email']
    ];
  }
}
