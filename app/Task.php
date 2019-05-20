<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable = ['title', 'description', 'deadline'];

  public function project()
  {
    return $this->belongsTo(Project::class);
  }
}
