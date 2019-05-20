<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  protected $fillable = ['title', 'description', 'user_id'];

  public function tasks()
  {
    return $this->hasMany(Task::class);
  }

  public function user()
  {
    return $this->hasOne(User::class);
  }
}
