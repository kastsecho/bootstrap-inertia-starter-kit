<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from '@lucide/vue';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef');

const toggleRecoveryCodesVisibility = async () => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="d-flex align-items-center gap-5">
                <LockKeyhole class="icon" />
                2FA recovery codes
            </CardTitle>
            <CardDescription class="fg-secondary mb-0">
                Recovery codes let you regain access if you lose your 2FA
                device. Store them in a secure password manager.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div
                class="d-flex flex-column user-select-none sm:align-items-center sm:justify-content-between gap-5 sm:flex-row"
            >
                <Button @click="toggleRecoveryCodesVisibility" class="w-fit">
                    <component
                        :is="isRecoveryCodesVisible ? EyeOff : Eye"
                        class="icon"
                    />
                    {{ isRecoveryCodesVisible ? 'Hide' : 'View' }} recovery
                    codes
                </Button>

                <Form
                    v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                    v-bind="regenerateRecoveryCodes.form()"
                    method="post"
                    :options="{ preserveScroll: true }"
                    @success="fetchRecoveryCodes"
                    v-slot="{ processing }"
                >
                    <Button
                        theme="secondary"
                        type="submit"
                        :disabled="processing"
                    >
                        <RefreshCw class="icon" />
                        Regenerate codes
                    </Button>
                </Form>
            </div>
            <div
                :class="[
                    'overflow-hidden',
                    isRecoveryCodesVisible
                        ? 'h-auto opacity-100'
                        : 'h-0 opacity-0',
                ]"
            >
                <div v-if="errors?.length" class="mt-5">
                    <AlertError :errors="errors" />
                </div>
                <div v-else class="mt-5 space-y-5">
                    <div
                        ref="recoveryCodeSectionRef"
                        class="bg-2 d-grid img-thumbnail gap-2 p-4 font-mono text-sm"
                    >
                        <div
                            v-if="!recoveryCodesList.length"
                            class="d-grid space-y-3"
                        >
                            <Spinner v-for="n in 8" :key="n" />
                        </div>
                        <code
                            v-else
                            v-for="(code, index) in recoveryCodesList"
                            :key="index"
                            class="fg-info"
                        >
                            {{ code }}
                        </code>
                    </div>
                    <p
                        class="fg-emphasis-secondary user-select-none mb-0 text-xs"
                    >
                        Each recovery code can be used once to access your
                        account and will be removed after use. If you need more,
                        click
                        <span class="fw-bold fg-body">Regenerate codes</span>
                        above.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
