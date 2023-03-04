<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Create a user
        $user = User::factory()->create();

        // Create three categories
        $categories = Category::factory()->count(3)->create();

        // Create five tasks for each category
        foreach ($categories as $category) {
            Task::factory()->count(5)->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
            ]);
        }
    }
}
