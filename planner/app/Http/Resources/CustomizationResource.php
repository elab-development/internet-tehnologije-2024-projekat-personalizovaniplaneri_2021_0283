<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Reources\Planner;
use App\Http\Reources\Category;

class CustomizationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'customization';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->resource->id,
            'boja' => $this->resource->boja,
            'slika' => $this->resource->slika,
            'font' => $this->resource->font,
            'tekst' => $this->resource->tekst,
            'planner_id' => new PlannerResource($this->resource->planner),
            'category_id' => new CategoryResource($this->resource->category)
        ];
    }
}
