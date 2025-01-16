<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'order_date',
        'price',
        'status',
        'user_id',
        'planner_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function planner()
    {
        return $this->belongsTo(Planner::class);
    }
}
