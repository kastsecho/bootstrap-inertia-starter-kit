<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
/* @chisel-passkeys */
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
/* @end-chisel-passkeys */
import InputError from '@/components/InputError.vue';
/* @chisel-passkeys */
import PasskeyVerify from '@/components/PasskeyVerify.vue';
/* @end-chisel-passkeys */
import PasswordInput from '@/components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

setLayoutProps({
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
});
</script>

<template>
    <Head title="Confirm password" />

    <!-- @chisel-passkeys -->
    <PasskeyVerify
        :routes="{
            options: confirmOptions(),
            submit: confirmStore(),
        }"
        label="Confirm with passkey"
        loading-label="Confirming..."
        separator="Or confirm with password"
    />
    <!-- @end-chisel-passkeys -->

    <Form
        v-bind="store.form()"
        reset-on-success
        v-slot="{ errors, processing }"
        class="d-flex flex-column gap-5"
    >
        <div class="row">
            <Label for="password" class="md:col-4 md:text-end" horizontal>
                Password
            </Label>
            <div class="form-field md:col-6">
                <PasswordInput
                    id="password"
                    name="password"
                    required
                    :tabindex="1"
                    autocomplete="current-password"
                    autofocus
                    placeholder="Password"
                    :invalid="!!errors.password"
                />
                <InputError :message="errors.password" />
            </div>
        </div>

        <div class="row">
            <div class="md:offset-4 md:col-6">
                <Button
                    type="submit"
                    :tabindex="2"
                    :disabled="processing"
                    data-test="confirm-password-button"
                >
                    <Spinner v-if="processing" />
                    Confirm password
                </Button>
            </div>
        </div>
    </Form>
</template>
