<?php

use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('projects')->insert([
      'title' => 'Project 1',
      'description' => Str::random(5) . ' ' . Str::random(10) . ' ' . Str::random(10),
    ]);

    DB::table('projects')->insert([
      'title' => 'Project 2',
      'description' => Str::random(5) . ' ' . Str::random(8) . ' ' . Str::random(15),
    ]);

    DB::table('projects')->insert([
      'title' => 'Project 3',
      'description' => Str::random(8) . ' ' . Str::random(15) . ' ' . Str::random(6),
    ]);

    DB::table('projects')->insert([
      'title' => 'Project 4',
      'description' => Str::random(5) . ' ' . Str::random(8) . ' ' . Str::random(15),
    ]);
  }
}
