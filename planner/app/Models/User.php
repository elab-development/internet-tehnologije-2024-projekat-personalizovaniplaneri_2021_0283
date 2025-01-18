<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $table = 'user';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'sifra',
        'datum_registracije',
        'type_id',
    ];

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    /*public function planner()
    {
        return $this->hasMany(Planner::class, 'user_id');
    }*/

    public function order()
    {
        return $this->hasMany(Order::class, 'order_id');
    }
}
