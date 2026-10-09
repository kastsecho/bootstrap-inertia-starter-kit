<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
/* @chisel-passkeys */
import type { Props as ManagePasskeysProps } from '@/components/ManagePasskeys.vue';
import ManagePasskeys from '@/components/ManagePasskeys.vue';
/* @end-chisel-passkeys */
/* @chisel-2fa */
import type { Props as ManageTwoFactorProps } from '@/components/ManageTwoFactor.vue';
import ManageTwoFactor from '@/components/ManageTwoFactor.vue';
/* @end-chisel-2fa */
import PasswordInput from '@/components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/security';
import { update } from '@/routes/user-password';

// oxfmt-ignore
type Props = {
    passwordRules: string;
} /* @chisel-passkeys */ & ManagePasskeysProps /* @end-chisel-passkeys */ /* @chisel-2fa */ &
    ManageTwoFactorProps; /* @end-chisel-2fa */

const props = defineProps<Props>();

setLayoutProps({
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
});
</script>

<template>
    <Head title="Security settings" />

    <h1 class="visually-hidden">Security settings</h1>

    <div class="space-y-5">
        <Heading
            variant="small"
            title="Update password"
            description="Ensure your account is using a long, random password to stay secure"
        />

        <Form
            v-bind="update.form()"
            :options="{ preserveScroll: true }"
            reset-on-success
            :reset-on-error="[
                'password',
                'password_confirmation',
                'current_password',
            ]"
            v-slot="{ errors, processing }"
            class="space-y-5"
        >
            <div class="d-grid form-field">
                <Label for="current_password">Current password</Label>
                <PasswordInput
                    id="current_password"
                    name="current_password"
                    autocomplete="current-password"
                    placeholder="Current password"
                    :invalid="!!errors.current_password"
                />
                <InputError :message="errors.current_password" />
            </div>

            <div class="d-grid form-field">
                <Label for="password">New password</Label>
                <PasswordInput
                    id="password"
                    name="password"
                    autocomplete="new-password"
                    placeholder="New password"
                    :passwordrules="props.passwordRules"
                    :invalid="!!errors.password"
                />
                <InputError :message="errors.password" />
            </div>

            <div class="d-grid form-field">
                <Label for="password_confirmation">Confirm password</Label>
                <PasswordInput
                    id="password_confirmation"
                    name="password_confirmation"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    :passwordrules="props.passwordRules"
                    :invalid="!!errors.password_confirmation"
                />
                <InputError :message="errors.password_confirmation" />
            </div>

            <div class="d-flex items-center gap-5">
                <Button
                    type="submit"
                    :disabled="processing"
                    data-test="update-password-button"
                >
                    Save
                </Button>
            </div>
        </Form>

        <!-- @chisel-2fa -->
        <ManageTwoFactor
            :canManageTwoFactor="canManageTwoFactor"
            :requiresConfirmation="requiresConfirmation"
            :twoFactorEnabled="twoFactorEnabled"
        />
        <!-- @end-chisel-2fa -->

        <!-- @chisel-passkeys -->
        <ManagePasskeys
            :canManagePasskeys="canManagePasskeys"
            :passkeys="passkeys"
        />
        <!-- @end-chisel-passkeys -->
    </div>
</template>
