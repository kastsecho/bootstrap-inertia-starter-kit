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
import { destroy as destroyMember } from '@/routes/teams/members';
import type { Team, TeamMember } from '@/types';

type Props = {
    team: Team;
    member: TeamMember | null;
    open: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const processing = ref(false);

const removeMember = () => {
    if (!props.member) {
        return;
    }

    router.visit(destroyMember([props.team.slug, props.member.id]), {
        onStart: () => (processing.value = true),
        onFinish: () => (processing.value = false),
        onSuccess: () => emit('update:open', false),
    });
};
</script>

<template>
    <Dialog :open="props.open" @update:open="emit('update:open', $event)">
        <DialogHeader class="vstack space-y-3">
            <DialogTitle>Remove team member</DialogTitle>
            <DialogDescription class="mb-0">
                Are you sure you want to remove
                <strong class="fg-emphasis-secondary">
                    {{ props.member?.name }}
                </strong>
                from this team?
            </DialogDescription>
        </DialogHeader>

        <DialogFooter class="gap-4">
            <DialogClose as-child>
                <Button type="button" variant="subtle">Cancel</Button>
            </DialogClose>

            <Button
                data-test="remove-member-confirm"
                theme="danger"
                :disabled="processing"
                @click="removeMember"
            >
                Remove member
            </Button>
        </DialogFooter>
    </Dialog>
</template>
