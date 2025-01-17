<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planner extends Model
{
    /** @use HasFactory<\Database\Factories\PlannerFactory> */
    use HasFactory;

    protected $table = 'planner';

    protected $fillable = [
        'naziv',
        'created_at',
        'status',
        'user_id',
    ];

    /*public function user()
    {
        return $this->belongsToMany(User::class, 'order', 'planner_id', 'user_id');
    }*/

    public function order()
    {
        return $this->hasMany(Order::class, 'planner_id');
    }

    public function customization()
    {
        return $this->hasMany(Customization::class, 'planner_id');
    }
}
