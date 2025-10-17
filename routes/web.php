<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => auth()->user()
        ],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => auth()->user()->load(['stats', 'medals'])
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Public routes
Route::get('/help-requests', function () {
    return Inertia::render('HelpRequests/Index', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
})->name('help-requests.index');

Route::get('/groups', function () {
    return Inertia::render('Groups/Index', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
})->name('groups.page');

Route::get('/events', function () {
    return Inertia::render('Events/Index', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
})->name('events.page');

Route::get('/nearby', function () {
    return Inertia::render('Nearby/Index', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
})->name('nearby.index');

Route::middleware('auth')->group(function () {
    Route::get('/help-requests/create', function () {
        return Inertia::render('HelpRequests/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    })->name('help-requests.create');
    
    Route::get('/groups/create', function () {
        return Inertia::render('Groups/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    })->name('groups.create');
    
    Route::get('/events/create', function () {
        return Inertia::render('Events/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    })->name('events.create');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
