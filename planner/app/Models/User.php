<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'registration_date',
        'type_id',
    ];

    public function type()
    {
        return $this->hasOne(Type::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
