<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $table = 'category';

    protected $fillable = [
        'naziv',
    ];

    public function customizations()
    {
        //return $this->hasMany(Customization::class);
        return $this->belongsTo(Customization::class);
    }
}
