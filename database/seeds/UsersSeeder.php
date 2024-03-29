<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('users')->insert([
      'name' => 'Aivirth',
      'email' => 'aivirth@gmail.com',
      'password' => bcrypt('secret'),
    ]);


    DB::table('users')->insert([
      'name' => Str::random(10),
      'email' => Str::random(10) . '@gmail.com',
      'password' => bcrypt('secret'),
    ]);

    DB::table('users')->insert([
      'name' => Str::random(10),
      'email' => Str::random(10) . '@gmail.com',
      'password' => bcrypt('secret'),
    ]);

    DB::table('users')->insert([
      'name' => Str::random(10),
      'email' => Str::random(10) . '@gmail.com',
      'password' => bcrypt('secret'),
    ]);
  }
}
