<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HelpRequestController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ProfileController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::get('/help-requests/nearby', [HelpRequestController::class, 'nearby']);
Route::get('/help-requests', [HelpRequestController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Help Requests
    Route::apiResource('help-requests', HelpRequestController::class)->except(['index']);
    Route::post('/help-requests/{id}/complete', [HelpRequestController::class, 'complete']);
    Route::post('/help-requests/{id}/help', [HelpRequestController::class, 'help']);
    
    // Groups
    Route::apiResource('groups', GroupController::class);
    Route::post('/groups/{id}/join', [GroupController::class, 'join']);
    Route::post('/groups/{id}/leave', [GroupController::class, 'leave']);
    
    // Events
    Route::apiResource('events', EventController::class);
    Route::post('/events/{id}/attend', [EventController::class, 'attend']);
    Route::post('/events/{id}/leave', [EventController::class, 'leave']);
    
    // Messages
    Route::apiResource('messages', MessageController::class);
    Route::get('/help-requests/{id}/messages', [MessageController::class, 'getHelpRequestMessages']);
    Route::get('/groups/{id}/messages', [MessageController::class, 'getGroupMessages']);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/update-location', [ProfileController::class, 'updateLocation']);
    Route::get('/profile/stats', [ProfileController::class, 'getStats']);
    Route::get('/profile/medals', [ProfileController::class, 'getMedals']);
});
