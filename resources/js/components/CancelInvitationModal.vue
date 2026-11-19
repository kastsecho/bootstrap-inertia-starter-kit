<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { destroy as destroyInvitation } from '@/routes/teams/invitations';
import type { Team, TeamInvitation } from '@/types';

type Props = {
    team: Team;
    invitation: TeamInvitation | null;
    open: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const processing = ref(false);

const cancelInvitation = () => {
    if (!props.invitation) {
        return;
    }

    router.visit(destroyInvitation([props.team.slug, props.invitation.code]), {
        onStart: () => (processing.value = true),
        onFinish: () => (processing.value = false),
        onSuccess: () => emit('update:open', false),
    });
};
</script>

<template>
    <Dialog :open="props.open" @update:open="emit('update:open', $event)">
        <DialogHeader class="vstack space-y-3">
            <DialogTitle>Cancel invitation</DialogTitle>
            <DialogDescription class="mb-0">
                Are you sure you want to cancel the invitation for
                <strong class="fg-emphasis-secondary">
                    {{ props.invitation?.email }}
                </strong>
                ?
            </DialogDescription>
        </DialogHeader>

        <DialogFooter class="gap-4">
            <DialogClose as-child>
                <Button type="button" variant="subtle">
                    Keep invitation
                </Button>
            </DialogClose>

            <Button
                data-test="cancel-invitation-confirm"
                theme="danger"
                :disabled="processing"
                @click="cancelInvitation"
            >
                Cancel invitation
            </Button>
        </DialogFooter>
    </Dialog>
</template>
