<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

/**
 * Public routes
 */
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

/**
 * Protected Routes
 */
Route::group(
  ['middleware' => ['jwt.verify', 'auth.jwt']],
  function () {
    Route::apiResource('projects', 'ProjectController');
    Route::post('projects/search', 'ProjectController@search');

    Route::get('/user', 'AuthController@getAuthUser');

    // Tasks 
    Route::get('/tasks/{task}', 'TaskController@show');
    Route::post('/projects/{project}/tasks/', 'TaskController@store');
    Route::patch('/tasks/{task}', 'TaskController@update');
    Route::delete('/tasks/{task}', 'TaskController@destroy');
  }
);
