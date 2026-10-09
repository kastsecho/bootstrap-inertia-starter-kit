<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();

setLayoutProps({
    title: 'Reset password',
    description: 'Please enter your new password below',
});

const inputEmail = ref(props.email);
</script>

<template>
    <Head title="Reset password" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
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
                    v-model="inputEmail"
                    :tabindex="1"
                    autocomplete="email"
                    disabled
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
                    :tabindex="1"
                    autocomplete="new-password"
                    autofocus
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
                    :tabindex="2"
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
                    :tabindex="3"
                    :disabled="processing"
                    data-test="reset-password-button"
                >
                    <Spinner v-if="processing" />
                    Reset password
                </Button>
            </div>
        </div>
    </Form>
</template>
