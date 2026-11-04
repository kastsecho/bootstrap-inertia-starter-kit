<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;
use Laravel\Fortify\Features;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class VerificationNotificationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::emailVerification());
    }

    #[Test]
    public function sends_verification_notification(): void
    {
        Notification::fake();

        $user = User::factory()->unverified()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('verification.send'));

        Notification::assertSentTo($user, VerifyEmail::class);
        $response->assertRedirect(route('home'));
    }

    #[Test]
    public function does_not_send_verification_notification_if_email_is_verified(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('verification.send'));

        Notification::assertNothingSent();
        $response->assertRedirect('/dashboard');
    }
}
