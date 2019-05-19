<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  protected $fillable = ['title', 'description'];

  public function tasks()
  {
    $this->hasMany(Task::class);
  }
}
