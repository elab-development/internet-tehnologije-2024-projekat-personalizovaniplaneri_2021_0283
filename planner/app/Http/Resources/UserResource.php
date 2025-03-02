<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Reources\Type;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'user';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->resource->id,
            'ime' => $this->resource->ime,
            'prezime' => $this->resource->prezime,
            'email' => $this->resource->email,
            'sifra' => $this->resource->sifra,
            'datum_registracije' => $this->resource->datum_registracije,
            'type_id' => new TypeResource($this->resource->type),
        ];
    }
}
