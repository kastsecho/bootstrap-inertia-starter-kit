<script setup lang="ts">
import { usePasskeyRegister } from '@laravel/passkeys/vue';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const emit = defineEmits<{
    success: [];
}>();

const getDefaultPasskeyName = () => {
    const ua = navigator.userAgent;

    const browser = [
        { pattern: /Edg|Edge/, name: 'Edge' },
        { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
        { pattern: /Firefox|FxiOS/, name: 'Firefox' },
        { pattern: /Chrome|CriOS/, name: 'Chrome' },
        { pattern: /Safari/, name: 'Safari' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    const os = [
        { pattern: /iPhone/, name: 'iPhone' },
        { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /Mac/, name: 'Mac' },
        { pattern: /Windows/, name: 'Windows' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    return [browser, os].filter(Boolean).join(' on ') || '';
};

const name = ref(getDefaultPasskeyName());
const showForm = ref(false);

const { register, isLoading, error, isSupported } = usePasskeyRegister({
    onSuccess: () => {
        name.value = '';
        showForm.value = false;
        emit('success');
    },
});

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!name.value.trim()) {
        return;
    }

    await register(name.value);
};

const handleCancel = () => {
    showForm.value = false;
    name.value = '';
};
</script>

<template>
    <div v-if="!isSupported" class="fg-secondary text-sm">
        Passkeys are not supported in this browser.
    </div>

    <Button
        v-else-if="!showForm"
        variant="outline"
        theme="secondary"
        @click="showForm = true"
    >
        Add passkey
    </Button>

    <Alert v-else class="vstack" theme="secondary">
        <form @submit="handleSubmit" class="space-y-5">
            <div class="d-grid form-field">
                <Label for="passkey-name">Passkey name</Label>
                <Input
                    id="passkey-name"
                    type="text"
                    v-model="name"
                    placeholder="e.g., MacBook Pro, iPhone"
                    v-focus
                    :invalid="!!error"
                />
                <p class="form-text text-xs">
                    A name helps you identify this passkey later.
                </p>
                <InputError v-if="error" :message="error" />
            </div>

            <div class="d-flex gap-2">
                <Button type="submit" :disabled="isLoading || !name.trim()">
                    {{ isLoading ? 'Registering...' : 'Register passkey' }}
                </Button>
                <Button type="button" variant="text" @click="handleCancel">
                    Cancel
                </Button>
            </div>
        </form>
    </Alert>
</template>
