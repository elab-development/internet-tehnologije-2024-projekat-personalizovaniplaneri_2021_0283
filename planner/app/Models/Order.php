<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $table = 'order';

    protected $fillable = [
        'datum_porucivanja',
        'cena',
        'status_porudzbine',
        'user_id',
        'planner_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function planner()
    {
        return $this->belongsTo(Planner::class, 'planner_id');
    }
}
