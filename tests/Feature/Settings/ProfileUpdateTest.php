<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    #[Test]
    public function profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('profile.edit'));

        $response->assertOk();
    }

    #[Test]
    public function profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/settings/profile', [
                'name' => 'Updated Name',
            ]);

        $response
            ->assertValid()
            ->assertRedirect(route('profile.edit'));

        $user->refresh();

        $this->assertSame('Updated Name', $user->name);
    }

    #[Test]
    public function user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'password',
            ]);

        $response
            ->assertValid()
            ->assertRedirect(route('home'));

        $this->assertGuest();
        $this->assertModelMissing($user);
    }
}
