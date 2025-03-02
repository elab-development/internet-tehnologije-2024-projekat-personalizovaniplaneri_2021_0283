<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'order';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->resource->id,
            'datum_porucivanja' => $this->resource->datum_porucivanja,
            'cena' => $this->resource->cena,
            'status_porudzbine' => $this->resource->status_porudzbine,
            'cena' => $this->resource->cena,
            'user_id' => new UserResource($this->resource->user),
            'planner_id' => new PlannerResource($this->resource->planner),
        ];
    }
}
