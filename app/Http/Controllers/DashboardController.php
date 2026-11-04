<?php

namespace App\Http\Controllers;

use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Inertia\Response;

#[Middleware('auth')]
#[Middleware('verified')]
#[Middleware(EnsureTeamMembership::class)]
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
