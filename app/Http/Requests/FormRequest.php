<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;
use Illuminate\Http\Response;

abstract class FormRequest extends LaravelFormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  abstract public function rules();

  /**
   * Get the failed validation response for the request.
   *
   * @param array $errors
   * @return Response
   */
  public function response(array $errors)
  {
    $transformed = [];

    foreach ($errors as $field => $message) {
      $transformed[] = [
        'field' => $field,
        'message' => $message[0]
      ];
    }

    return response()->json([
      'errors' => $transformed
    ], Response::HTTP_UNPROCESSABLE_ENTITY);
  }
}
