<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { email } from '@/routes/password';

defineProps<{
    status?: string;
}>();

setLayoutProps({
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
});
</script>

<template>
    <Head title="Forgot password" />

    <Alert v-if="status" theme="success" class="fw-medium mb-3 text-sm">
        <p class="mx-auto">{{ status }}</p>
    </Alert>

    <Form
        v-bind="email.form()"
        reset-on-success
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
                    :invalid="!!errors.email"
                />
                <InputError :message="errors.email" />
            </div>
        </div>

        <div class="row">
            <div class="md:offset-4 md:col-6">
                <Button
                    type="submit"
                    :tabindex="2"
                    :disabled="processing"
                    data-test="email-password-reset-link-button"
                >
                    <Spinner v-if="processing" />
                    Email password reset link
                </Button>
            </div>
        </div>
    </Form>
</template>
