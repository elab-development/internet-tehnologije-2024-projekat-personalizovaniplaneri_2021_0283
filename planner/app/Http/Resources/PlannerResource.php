<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlannerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'planner';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->resource->id,
            'naziv' => $this->resource->naziv,
            'datum_kreiranja' => $this->resource->datum_kreiranja,
            'status' => $this->resource->status,
        ];
    }
}
