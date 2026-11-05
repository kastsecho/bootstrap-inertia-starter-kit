<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
/* @chisel-passkeys */
import PasskeyVerify from '@/components/PasskeyVerify.vue';
/* @end-chisel-passkeys */
import TeamInvitationAlert from '@/components/TeamInvitationAlert.vue';
import TextLink from '@/components/TextLink.vue';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import type { TeamInvitationContext } from '@/types';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    teamInvitation?: TeamInvitationContext | null;
}>();

setLayoutProps({
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
});
</script>

<template>
    <Head title="Log in" />

    <Alert v-if="status" theme="success" class="fw-medium mb-3 text-sm">
        <p class="mx-auto">{{ status }}</p>
    </Alert>

    <TeamInvitationAlert
        v-if="teamInvitation"
        :invitation="teamInvitation"
        action="Log in"
    />

    <!-- @chisel-passkeys -->
    <PasskeyVerify />
    <!-- @end-chisel-passkeys -->

    <Form
        v-bind="store.form()"
        :reset-on-success="['password']"
        v-slot="{ errors, processing }"
        class="d-flex flex-column gap-5"
    >
        <div class="row">
            <Label for="email" class="md:col-4 md:text-end" horizontal>
                Email address
            </Label>
            <div class="form-field md:col-6">
                <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="email"
                    placeholder="email@example.com"
                    :invalid="!!errors.email"
                />
                <InputError :message="errors.email" />
            </div>
        </div>

        <div class="row">
            <Label for="password" class="md:col-4 md:text-end" horizontal>
                Password
            </Label>
            <div class="form-field md:col-6">
                <PasswordInput
                    id="password"
                    name="password"
                    required
                    :tabindex="2"
                    autocomplete="current-password"
                    placeholder="Password"
                    :invalid="!!errors.password"
                />
                <InputError :message="errors.password" />
            </div>
        </div>

        <div class="row">
            <div class="md:offset-4 md:col-6">
                <Label for="remember" custom-class-name="form-field">
                    <Checkbox id="remember" name="remember" :tabindex="3" />
                    <span>Remember me</span>
                </Label>
            </div>
        </div>

        <div class="row">
            <div class="align-items-center d-flex md:offset-4 md:col-6">
                <Button
                    type="submit"
                    :tabindex="4"
                    :disabled="processing"
                    data-test="login-button"
                >
                    <Spinner v-if="processing" size="sm" />
                    Log in
                </Button>

                <TextLink
                    v-if="canResetPassword"
                    class="ms-5 text-sm"
                    :href="request()"
                    :tabindex="5"
                >
                    Forgot your password?
                </TextLink>
            </div>
        </div>
    </Form>
</template>
