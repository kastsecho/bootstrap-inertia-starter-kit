<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\WorkOS\Http\Requests\AuthKitAccountDeletionRequest;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class ProfileController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
        return inertia('settings/Profile', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->update(['name' => $request->name]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return to_route('profile.edit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AuthKitAccountDeletionRequest $request): SymfonyRedirectResponse
    {
        return $request->delete(
            using: fn (User $user) => $user->delete(),
        );
    }
}
