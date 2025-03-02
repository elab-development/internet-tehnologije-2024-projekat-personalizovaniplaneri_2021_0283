<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'user';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'sifra',
        'datum_registracije',
        'type_id'
    ];

    public function getAuthPassword()
    {
        return $this->sifra;
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function order()
    {
        return $this->hasMany(Order::class, 'order_id');
    }
}