<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\StatusResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PriorityResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'due_date' => $this->due_date,
            'status' => new StatusResource($this->status),
            'priority' => new PriorityResource($this->priority),
            'category' => new CategoryResource($this->category),
        ];
    }
}
