<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;


class ProjectsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run(Faker $faker)
  {

    foreach (range(1, 20) as $index) {

      // $year = rand(2009, 2016);
      $year = 2019;
      $month = rand(1, 12);
      $day = rand(1, 28);

      $date = Carbon::create($year, $month, $day, 0, 0, 0);

      DB::table('projects')->insert([
        'user_id'       => rand(1, 3),
        'title'         => $faker->sentence(6),
        'description'   => $faker->sentence(10),
        'deadline'  => $date->addWeeks(rand(1, 52))->format('Y-m-d H:i:s')
      ]);
    }
  }
}
