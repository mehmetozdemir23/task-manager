<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PriorityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('user')->group(
        function () {
            Route::get('/', [AuthController::class, 'getAuthUser']);
            Route::patch('/', [AuthController::class, 'updateUser']);
        }
    );
    Route::resource('statuses', StatusController::class);
    Route::resource('priorities', PriorityController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tasks', TaskController::class);
});
