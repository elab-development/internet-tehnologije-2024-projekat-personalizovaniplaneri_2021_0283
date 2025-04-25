<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    /** @use HasFactory<\Database\Factories\TypeFactory> */
    use HasFactory;

    protected $table = 'type';

    protected $fillable = [
        'naziv',
    ];

    public function user()
    {
        return $this->hasMany(User::class, 'type_id');
    }
    
}
