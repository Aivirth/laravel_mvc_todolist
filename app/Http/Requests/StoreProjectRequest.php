<?php

namespace App\Http\Requests;


use App\Http\Requests\FormRequest;

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
      'user_id'       => 'required',
      'deadline'      => 'required|date'
    ];
  }
}
