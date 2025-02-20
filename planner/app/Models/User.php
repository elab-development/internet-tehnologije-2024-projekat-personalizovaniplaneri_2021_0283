<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'user';

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'sifra',
        'datum_registracije',
        'type_id',
        'role',
    ];
    protected $casts = [
        'role' => 'string',
    ];
    

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'type_id' => $this->type_id, // Dodaj tip korisnika u token
        ];
    }

    public function getAuthPassword()
    {
        return $this->sifra;
    }


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
