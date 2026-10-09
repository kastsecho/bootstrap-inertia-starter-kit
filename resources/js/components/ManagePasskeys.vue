<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { KeyRound } from '@lucide/vue';
import Heading from '@/components/Heading.vue';
import PasskeyItem from '@/components/PasskeyItem.vue';
import PasskeyRegister from '@/components/PasskeyRegister.vue';
import { Alert } from '@/components/ui/alert';
import { ListGroup } from '@/components/ui/list-group';
import { destroy } from '@/routes/passkey';
import type { Passkey } from '@/types/auth';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

withDefaults(defineProps<Props>(), {
    canManagePasskeys: false,
    passkeys: () => [],
});

const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onError,
    });
};

const handleRegisterSuccess = () => {
    router.reload();
};
</script>

<template>
    <div v-if="canManagePasskeys" class="space-y-5">
        <Heading
            variant="small"
            title="Passkeys"
            description="Manage your passkeys for passwordless sign-in"
        />

        <ListGroup v-if="passkeys.length">
            <PasskeyItem
                v-for="passkey in passkeys"
                :key="passkey.id"
                :passkey="passkey"
                @remove="handleDelete"
            />
        </ListGroup>

        <Alert v-else class="vstack text-center">
            <div class="bg-3 rounded-5 mx-auto mb-4 p-4">
                <KeyRound class="fg-secondary" :size="28" />
            </div>
            <p class="fw-medium">No passkeys yet</p>
            <p class="fg-secondary text-sm">
                Add a passkey to sign in without a password
            </p>
        </Alert>

        <PasskeyRegister @success="handleRegisterSuccess" />
    </div>
</template>
