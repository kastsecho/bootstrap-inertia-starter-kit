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
import { leave as leaveTeamAction } from '@/routes/teams';
import type { Team } from '@/types';

const props = defineProps<{
    team: Team | null;
    open: boolean;
}>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const processing = ref(false);

const leaveTeam = () => {
    if (!props.team) {
        return;
    }

    router.visit(leaveTeamAction(props.team.slug), {
        onStart: () => (processing.value = true),
        onFinish: () => (processing.value = false),
        onSuccess: () => emit('update:open', false),
    });
};
</script>

<template>
    <Dialog :open="props.open" @update:open="emit('update:open', $event)">
        <DialogHeader class="vstack space-y-3">
            <DialogTitle>Leave team</DialogTitle>
            <DialogDescription class="mb-0">
                Are you sure you want to leave
                <strong>{{ props.team?.name }}</strong
                >?
            </DialogDescription>
        </DialogHeader>

        <DialogFooter class="gap-4">
            <DialogClose as-child>
                <Button typ="button" variant="subtle">Cancel</Button>
            </DialogClose>

            <Button
                theme="danger"
                :disabled="processing"
                data-test="leave-team-confirm"
                @click="leaveTeam"
            >
                Leave team
            </Button>
        </DialogFooter>
    </Dialog>
</template>
