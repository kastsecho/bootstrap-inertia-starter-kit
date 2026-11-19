<?php

namespace App\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Features;

trait HasProfileAvatar
{
    /**
     * Update the user's profile photo.
     */
    public function updateProfileAvatar(UploadedFile $photo, string $storagePath = 'profile-avatars'): void
    {
        $path = $photo->storePublicly(
            $storagePath, ['disk' => $this->profileAvatarDisk()]
        );

        if ($path === false) {
            return;
        }

        tap($this->avatar, function ($previous) use ($path) {
            $this->forceFill([
                'avatar' => Storage::disk($this->profileAvatarDisk())->url($path),
            ])->save();

            if ($previous) {
                Storage::disk($this->profileAvatarDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the user's profile photo.
     */
    public function deleteProfileAvatar(): void
    {
        if (! Features::updateProfileInformation()) {
            return;
        }

        if (is_null($this->avatar)) {
            return;
        }

        Storage::disk($this->profileAvatarDisk())->delete($this->avatar);

        $this->forceFill([
            'avatar' => null,
        ])->save();
    }

    /**
     * Get the disk that profile photos should be stored on.
     */
    protected function profileAvatarDisk(): string
    {
        return 'public';
    }
}
