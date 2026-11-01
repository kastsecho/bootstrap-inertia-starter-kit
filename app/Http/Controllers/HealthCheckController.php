<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Events\DiagnosingHealth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class HealthCheckController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @throws Throwable
     */
    public function __invoke(Request $request): Response|JsonResponse
    {
        $exception = null;

        try {
            Event::dispatch(new DiagnosingHealth);
        } catch (Throwable $e) {
            if (app()->hasDebugModeEnabled()) {
                throw $e;
            }

            report($e);

            $exception = $e->getMessage();
        }

        $status = $exception ? 500 : 200;

        $renderTime = defined('LARAVEL_START')
            ? round((microtime(true) - LARAVEL_START) * 1000)
            : null;

        if ($request->expectsJson()) {
            return response()->json([
                'status' => $exception ? 'down' : 'up',
            ], $status);
        }

        return inertia('HealthUp', [
            'exception' => $exception,
            'renderTime' => $renderTime,
        ])->toResponse($request)->setStatusCode($status);
    }
}
