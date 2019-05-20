<?php

namespace App\Http\Controllers;

use Validator;
use App\Task;
use App\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
  }


  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Project $project)
  {
    $requestData = request()->all();
    $validator = Validator::make($requestData, [
      'title'         => ['required', 'min:3'],
      'description'   => 'required|min:10'
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()]);
    } else {

      $task = $project->tasks()->create($requestData);
      return response()->json($task, 201);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Task  $task
   * @return \Illuminate\Http\Response
   */
  public function show(Task $task)
  {
    return response()->json($task, 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Task  $task
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Task $task)
  {

    $requestData = request()->all();
    $validator = Validator::make(request()->all(), [
      'title'         => ['min:3'],
      'description'   => 'min:10',
      'is_completed'  => 'boolean'
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()]);
    } else {
      $updatedTask = $task->update($requestData);
      return response()->json($updatedTask, 200);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Task  $task
   * @return \Illuminate\Http\Response
   */
  public function destroy(Task $task)
  {
    $task->delete();

    return response()->json(null, 204);
  }
}
