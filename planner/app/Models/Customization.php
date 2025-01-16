<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customization extends Model
{
    /** @use HasFactory<\Database\Factories\CustomizationFactory> */
    use HasFactory;

    protected $table = 'customizations';

    protected $fillable = [
        'color',
        'image',
        'font',
        'text',
        'planner_id',
        'category_id',
    ];

    public function planner()
    {
        return $this->belongsTo(Planner::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
