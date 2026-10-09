<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { useClipboard } from '@vueuse/core';
import { Check, Copy, ScanLine } from '@lucide/vue';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import AlertError from '@/components/AlertError.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import type { TwoFactorConfigContent } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const props = defineProps<{
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
}>();
const isOpen = defineModel<boolean>('isOpen');

const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } =
    useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<string>('');

const pinInputContainerRef = useTemplateRef('pinInputContainerRef');

const modalConfig = computed<TwoFactorConfigContent>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-factor authentication enabled',
            description:
                'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify authentication code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable two-factor authentication',
        description:
            'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const handleModalNextStep = () => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(() => {
            pinInputContainerRef.value?.querySelector('input')?.focus();
        });

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = () => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = '';
};

watch(
    () => isOpen.value,
    async (isOpen) => {
        if (!isOpen) {
            resetModalState();

            return;
        }

        if (!qrCodeSvg.value) {
            await fetchSetupData();
        }
    },
);
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogHeader
            class="vstack d-flex align-items-center justify-content-center"
        >
            <div
                class="badge rounded-circle btn-icon bg-3 border-subtle-secondary mb-4 border"
            >
                <ScanLine class="fg-emphasis-secondary" :size="24" />
            </div>
            <DialogTitle>{{ modalConfig.title }}</DialogTitle>
            <DialogDescription class="mb-0 text-center">
                {{ modalConfig.description }}
            </DialogDescription>
        </DialogHeader>

        <DialogContent class="sm:max-w-md">
            <div
                class="vstack d-flex flex-column align-items-center w-auto justify-center space-y-5"
            >
                <template v-if="!showVerificationStep">
                    <AlertError v-if="errors?.length" :errors="errors" />
                    <template v-else>
                        <div class="d-flex align-items-center overflow-hidden">
                            <div
                                v-if="!qrCodeSvg"
                                class="img-thumbnail bg-transparent"
                            >
                                <Spinner />
                            </div>
                            <div v-else class="img-thumbnail bg-white">
                                <div v-html="qrCodeSvg" />
                            </div>
                        </div>

                        <div class="d-flex align-items-center w-100 space-x-5">
                            <Button class="w-100" @click="handleModalNextStep">
                                {{ modalConfig.buttonText }}
                            </Button>
                        </div>

                        <div class="position-relative w-100">
                            <div
                                class="position-absolute d-flex align-items-center start-0 end-0 top-0 bottom-0"
                            >
                                <Separator />
                            </div>
                            <div
                                class="position-relative d-flex justify-content-center text-uppercase text-xs"
                            >
                                <span
                                    class="bg-body fg-secondary px-4 text-center"
                                >
                                    or, enter the code manually
                                </span>
                            </div>
                        </div>

                        <div
                            class="d-flex align-items-center justify-content-center w-100 space-x-2"
                        >
                            <div
                                v-if="!manualSetupKey"
                                class="border-border flex w-full items-stretch overflow-hidden rounded-xl border"
                            >
                                <div
                                    class="bg-muted flex h-full w-full items-center justify-center p-3"
                                >
                                    <Spinner />
                                </div>
                            </div>
                            <template v-else>
                                <div class="input-group">
                                    <Input
                                        type="text"
                                        disabled
                                        :default-value="manualSetupKey"
                                    />
                                    <Button
                                        @click="copy(manualSetupKey || '')"
                                        size="icon"
                                    >
                                        <Check
                                            v-if="copied"
                                            class="icon fg-success"
                                        />
                                        <Copy v-else class="icon" />
                                    </Button>
                                </div>
                            </template>
                        </div>
                    </template>
                </template>

                <template v-else>
                    <Form
                        v-bind="confirm.form()"
                        error-bag="confirmTwoFactorAuthentication"
                        reset-on-error
                        @finish="code = ''"
                        @success="isOpen = false"
                        v-slot="{ errors, processing }"
                        class="d-flex w-100 flex-col items-center justify-center space-y-3"
                    >
                        <input type="hidden" name="code" :value="code" />
                        <div
                            ref="pinInputContainerRef"
                            class="relative w-100 space-y-5"
                        >
                            <div
                                class="form-field d-flex flex-column place-items-center text-center"
                            >
                                <InputOTP
                                    id="otp"
                                    v-model="code"
                                    :maxlength="6"
                                    autofocus
                                    :invalid="!!errors.code"
                                >
                                    <InputOTPSlot :disabled="processing" />
                                </InputOTP>
                                <InputError :message="errors?.code" />
                            </div>

                            <div
                                class="d-flex align-items-center col-7 mx-auto space-x-5"
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    theme="secondary"
                                    class="w-auto flex-grow-1"
                                    @click="showVerificationStep = false"
                                    :disabled="processing"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    class="w-auto flex-grow-1"
                                    :disabled="processing || code.length < 6"
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </Form>
                </template>
            </div>
        </DialogContent>
    </Dialog>
</template>
