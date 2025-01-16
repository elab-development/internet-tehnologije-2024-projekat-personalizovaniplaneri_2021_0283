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
        return $this->hasOne(Type::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
