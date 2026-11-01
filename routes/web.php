<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HealthCheckController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)
    ->name('home');
Route::get('/dashboard', DashboardController::class)
    ->name('dashboard');
Route::get('/up', HealthCheckController::class)
    ->name('up');

require base_path('routes/settings.php');
