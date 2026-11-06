<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Response;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

#[Middleware('auth')]
#[Middleware(ValidateSessionWithWorkOS::class)]
class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return inertia('Dashboard', [
            'status' => $request->session()->get('status'),
        ]);
    }
}
