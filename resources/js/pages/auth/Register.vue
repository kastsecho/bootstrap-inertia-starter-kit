<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/register';

defineProps<{
    passwordRules: string;
}>();

setLayoutProps({
    title: 'Create an account',
    description: 'Enter your details below to create your account',
});
</script>

<template>
    <Head title="Register" />

    <Form
        v-bind="store.form()"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
        class="d-flex flex-column gap-5"
    >
        <div class="row">
            <Label for="name" class="md:col-4 md:text-end" horizontal>
                Name
            </Label>
            <div class="form-field md:col-6">
                <Input
                    id="name"
                    type="text"
                    name="name"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="name"
                    placeholder="Full name"
                    :invalid="!!errors.name"
                />
                <InputError :message="errors.name" />
            </div>
        </div>

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
                    :tabindex="2"
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
                    :tabindex="3"
                    autocomplete="new-password"
                    placeholder="Password"
                    :passwordrules="passwordRules"
                    :invalid="!!errors.password"
                />
                <InputError :message="errors.password" />
            </div>
        </div>

        <div class="row">
            <Label
                for="password_confirmation"
                class="md:col-4 md:text-end"
                horizontal
            >
                Confirm password
            </Label>
            <div class="form-field md:col-6">
                <PasswordInput
                    id="password_confirmation"
                    name="password_confirmation"
                    required
                    :tabindex="4"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    :passwordrules="passwordRules"
                    :invalid="!!errors.password_confirmation"
                />
                <InputError :message="errors.password_confirmation" />
            </div>
        </div>

        <div class="row">
            <div class="md:offset-4 md:col-6">
                <Button
                    type="submit"
                    :tabindex="5"
                    :disabled="processing"
                    data-test="register-user-button"
                >
                    <Spinner v-if="processing" />
                    Create account
                </Button>
            </div>
        </div>
    </Form>
</template>
