<?php

use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('tasks')->insert([
      'title' => 'Task 1',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 1
    ]);

    DB::table('tasks')->insert([
      'title' => 'Task 2',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 3
    ]);

    DB::table('tasks')->insert([
      'title' => 'Task 3',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 1
    ]);

    DB::table('tasks')->insert([
      'title' => 'Task 4',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 3
    ]);

    DB::table('tasks')->insert([
      'title' => 'Task 5',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 2
    ]);

    DB::table('tasks')->insert([
      'title' => 'Task 6',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
      'project_id' => 2
    ]);
  }
}
