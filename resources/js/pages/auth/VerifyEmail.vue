<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Alert } from '@/components/ui/alert';

defineProps<{
    status?: string;
}>();

setLayoutProps({
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
});
</script>

<template>
    <Head title="Email verification" />

    <Alert
        v-if="status === 'verification-link-sent'"
        theme="success"
        class="fw-medium mb-3 text-sm"
    >
        <p class="mx-auto">
            A new verification link has been sent to the email address you
            provided during registration.
        </p>
    </Alert>

    <Form
        v-bind="send.form()"
        v-slot="{ processing }"
        class="d-flex flex-column gap-5"
    >
        <div class="row">
            <div class="align-items-center d-flex md:offset-4 md:col-6">
                <Button
                    type="submit"
                    :tabindex="1"
                    :disabled="processing"
                    data-test="verify-email-button"
                >
                    <Spinner v-if="processing" />
                    Resend verification email
                </Button>

                <TextLink
                    class="btn-link ms-5 text-sm"
                    :href="logout()"
                    as="button"
                    :tabindex="2"
                >
                    Log out
                </TextLink>
            </div>
        </div>
    </Form>
</template>
