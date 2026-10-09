<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { computed, ref, watchEffect } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/two-factor/login';
import type { TwoFactorConfigContent } from '@/types';

const showRecoveryInput = ref<boolean>(false);
const code = ref<string>('');

const authConfigContent = computed<TwoFactorConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: 'Recovery code',
            description:
                'Please confirm access to your account by entering one of your emergency recovery codes.',
            buttonText: 'Login using an authentication code',
        };
    }

    return {
        title: 'Authentication code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        buttonText: 'Login using a recovery code',
    };
});

watchEffect(() => {
    setLayoutProps({
        title: authConfigContent.value.title,
        description: authConfigContent.value.description,
    });
});

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = '';
};
</script>

<template>
    <Head title="Two-factor authentication" />

    <div class="space-y-5">
        <template v-if="!showRecoveryInput">
            <Form
                v-bind="store.form()"
                reset-on-error
                @error="code = ''"
                v-slot="{ errors, processing, clearErrors }"
                class="d-flex flex-column gap-5"
            >
                <div class="row">
                    <Label for="otp" class="md:col-4 md:text-end" horizontal>
                        Authentication code
                    </Label>
                    <div class="form-field md:col-6">
                        <input type="hidden" name="code" :value="code" />
                        <InputOTP
                            id="otp"
                            v-model="code"
                            :maxlength="6"
                            autofocus
                            :invalid="!!errors.code"
                        >
                            <InputOTPSlot :disabled="processing" />
                        </InputOTP>
                        <InputError :message="errors.code" />
                    </div>
                </div>

                <div class="row">
                    <div class="align-items-center d-flex md:offset-4 md:col-6">
                        <Button
                            type="submit"
                            :disabled="processing"
                            data-test="continue-button"
                        >
                            <Spinner v-if="processing" size="sm" />
                            Continue
                        </Button>

                        <Button
                            type="button"
                            variant="text"
                            size="sm"
                            class="ms-5"
                            @click="() => toggleRecoveryMode(clearErrors)"
                        >
                            {{ authConfigContent.buttonText }}
                        </Button>
                    </div>
                </div>
            </Form>
        </template>

        <template v-else>
            <Form
                v-bind="store.form()"
                reset-on-error
                v-slot="{ errors, processing, clearErrors }"
                class="d-flex flex-column gap-5"
            >
                <div class="row">
                    <Label
                        for="recovery_code"
                        class="md:col-4 md:text-end"
                        horizontal
                    >
                        Recovery code
                    </Label>
                    <div class="form-field md:col-6">
                        <Input
                            id="recovery_code"
                            type="text"
                            name="recovery_code"
                            required
                            v-focus
                            placeholder="Enter recovery code"
                            :invalid="!!errors.recovery_code"
                        />
                        <InputError :message="errors.recovery_code" />
                    </div>
                </div>

                <div class="row">
                    <div class="align-items-center d-flex md:offset-4 md:col-6">
                        <Button
                            type="submit"
                            :disabled="processing"
                            data-test="continue-button"
                        >
                            <Spinner v-if="processing" size="sm" />
                            Continue
                        </Button>

                        <Button
                            type="button"
                            variant="text"
                            size="sm"
                            class="ms-5"
                            @click="() => toggleRecoveryMode(clearErrors)"
                        >
                            {{ authConfigContent.buttonText }}
                        </Button>
                    </div>
                </div>
            </Form>
        </template>
    </div>
</template>
