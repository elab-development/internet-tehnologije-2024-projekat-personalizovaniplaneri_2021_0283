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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customization()
    {
        return $this->hasOne(Customization::class);
    }
}
