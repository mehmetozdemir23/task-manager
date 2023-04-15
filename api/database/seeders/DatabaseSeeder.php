<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use App\Models\Status;
use App\Models\Category;
use App\Models\Priority;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();


        // Create a user
        $user = User::create([
            'email' => 'test@example.com',
            'password'=>Hash::make('test_password')
        ]);


        // Create three categories
        $categories = Category::factory()->count(6)->create();

        // Create three priorities
        $priorities[] = Priority::create(['name' => 'optional']);
        $priorities[] = Priority::create(['name' => 'important']);
        $priorities[] = Priority::create(['name' => 'critical']);

        // Create three statuses
        $statuses[] = Status::create(['name' => 'todo']);
        $statuses[] = Status::create(['name' => 'in progress']);
        $statuses[] = Status::create(['name' => 'completed']);

        Task::factory()->create([
            'user_id' => $user->id,
            'category_id' => $categories[0]->id,
            'priority_id' => rand(1, 3),
            'status_id' => rand(1, 3)
        ]);

        // Create five tasks for each category
        foreach ($categories as $category) {
            Task::factory()->count(5)->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'priority_id' => rand(1, 3),
                'status_id' => rand(1, 3)
            ]);
        }
    }
}
