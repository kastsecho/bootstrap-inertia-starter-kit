<script setup lang="ts">
import { KeyRound, Trash2 } from '@lucide/vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ListGroupItem } from '@/components/ui/list-group';
import type { Passkey } from '@/types/auth';

const props = defineProps<{
    passkey: Passkey;
}>();

const emit = defineEmits<{
    remove: [id: number, onError: () => void];
}>();

const isDeleting = ref(false);

const handleDelete = () => {
    isDeleting.value = true;
    emit('remove', props.passkey.id, () => {
        isDeleting.value = false;
    });
};
</script>

<template>
    <ListGroupItem class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-4">
            <div
                class="d-flex align-items-center justify-content-center rounded-5 bg-3 flex-shrink-0 p-4"
            >
                <KeyRound class="fg-secondary" :size="20" />
            </div>
            <div class="space-y-1">
                <div class="d-flex align-items-center gap-3">
                    <p class="fw-medium mb-0 tracking-tight">
                        {{ passkey.name }}
                    </p>
                    <span
                        v-if="passkey.authenticator"
                        class="badge theme-secondary badge-subtle fw-medium"
                    >
                        {{ passkey.authenticator }}
                    </span>
                </div>
                <p class="fg-secondary mb-0 text-sm">
                    Added {{ passkey.created_at_diff }}
                    <template v-if="passkey.last_used_at_diff">
                        <span class="fg-secondary mx-1 opacity-50">/</span>
                        Last used {{ passkey.last_used_at_diff }}
                    </template>
                </p>
            </div>
        </div>

        <DialogTrigger as-child :target="`#removePasskey${passkey.id}`">
            <Button variant="text" theme="danger" size="icon-sm">
                <Trash2 class="icon" />
                <span class="visually-hidden">Remove</span>
            </Button>
        </DialogTrigger>

        <Dialog :id="`removePasskey${passkey.id}`">
            <DialogContent>
                <DialogTitle>Remove passkey</DialogTitle>
                <DialogDescription class="mb-0">
                    Are you sure you want to remove the "{{ passkey.name }}"
                    passkey? You will no longer be able to use it to sign in.
                </DialogDescription>
            </DialogContent>
            <DialogFooter class="gap-3">
                <DialogClose as-child>
                    <Button variant="subtle">Cancel</Button>
                </DialogClose>
                <Button
                    theme="danger"
                    :disabled="isDeleting"
                    @click="handleDelete"
                >
                    {{ isDeleting ? 'Removing...' : 'Remove passkey' }}
                </Button>
            </DialogFooter>
        </Dialog>
    </ListGroupItem>
</template>
