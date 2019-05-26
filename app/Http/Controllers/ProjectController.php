<?php

namespace App\Http\Controllers;

use Validator;
use App\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request, Response $response)
  {
    $projects = Project::all();
    return response()->json(['projects' => $projects], 200);
  }


  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreProjectRequest $request)
  {
    $validated = $request->validated();
    $project = Project::create($validated);
    return response()->json($project, 201);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function show(Project $project)
  {
    $project->tasks;
    return response()->json(['projects' => $project], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Project $project)
  {
    $validated = $request->validated();
    $project->update($validated);
    return response()->json($project, 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function destroy(Project $project)
  {
    $project->delete();

    return response()->json(null, 204);
  }
}
