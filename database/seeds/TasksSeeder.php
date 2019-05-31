<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class TasksSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run(Faker $faker)
  {
    foreach (range(1, 50) as $index) {

      DB::table('tasks')->insert([
        'title'         => $faker->sentence(6),
        'description'   => $faker->sentence(5),
        'project_id'    => rand(1, 20),
      ]);
    }
  }
}
