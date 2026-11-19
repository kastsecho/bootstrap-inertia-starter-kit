<?php

namespace App\Actions\Fortify;

use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    use ProfileValidationRules;

    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, mixed>  $input
     */
    public function update(User $user, array $input): void
    {
        if (config('fortify.lowercase_usernames') && is_string($input['email'] ?? null)) {
            $input['email'] = Str::lower($input['email']);
        }

        Validator::make($input, [
            ...$this->profileRules($user->id),
            'avatar' => $this->avatarRules(),
        ])->validateWithBag('updateProfileInformation');

        if (isset($input['avatar'])) {
            $user->updateProfileAvatar($input['avatar']);
        }

        if ($input['email'] !== $user->email) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill([
                'name' => $input['name'],
                'email' => $input['email'],
            ])->save();
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(User $user, array $input): void
    {
        $user->forceFill([
            'name' => $input['name'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ]);

        if ($user->isDirty('email')) {
            $user->sendEmailVerificationNotification();
        }

        $user->save();
    }
}
