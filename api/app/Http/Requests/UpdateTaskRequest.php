<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $taskId = $this->route('task')->id;
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tasks', 'title')->ignore($taskId)
            ],
            'description' => 'required|string',
            'due_date' => 'nullable|date',
            'status_id' => 'required|exists:statuses,id',
            'category_id' => 'required|exists:categories,id',
            'priority_id' => 'required|exists:priorities,id',
        ];
    }
}
