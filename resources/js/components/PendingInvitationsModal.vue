<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { accept, decline } from '@/routes/invitations';
import type { DashboardInvitation } from '@/types';

const props = defineProps<{
    invitations: DashboardInvitation[];
}>();

const open = ref(true);
const processingCode = ref<string | null>(null);

const acceptInvitation = (invitation: DashboardInvitation) => {
    router.visit(accept(invitation), {
        onStart: () => (processingCode.value = invitation.code),
        onFinish: () => (processingCode.value = null),
    });
};

const declineInvitation = (invitation: DashboardInvitation) => {
    router.visit(decline(invitation), {
        onStart: () => (processingCode.value = invitation.code),
        onFinish: () => (processingCode.value = null),
        onSuccess: () => {
            if (props.invitations.length === 1) {
                open.value = false;
            }
        },
    });
};
</script>

<template>
    <Dialog v-model:open="open">
        <DialogHeader class="vstack space-y-3">
            <DialogTitle>Pending team invitations</DialogTitle>
            <DialogDescription class="mb-0">
                Accept or decline the teams you have been invited to join.
            </DialogDescription>
        </DialogHeader>

        <DialogContent data-test="pending-invitations-modal">
            <div class="d-grid wrap gap-5">
                <Alert
                    v-for="invitation in props.invitations"
                    :key="invitation.code"
                    data-test="pending-invitation-row"
                    class="vstack"
                >
                    <div class="space-y-1">
                        <p class="fw-medium">{{ invitation.team.name }}</p>
                        <p class="fg-secondary text-sm">
                            {{ invitation.inviterName }} invited you to join
                            this team.
                        </p>
                    </div>

                    <div class="d-flex justify-content-end gap-4">
                        <Button
                            theme="secondary"
                            data-test="pending-invitation-decline"
                            :disabled="processingCode === invitation.code"
                            @click="declineInvitation(invitation)"
                        >
                            Decline
                        </Button>

                        <Button
                            data-test="pending-invitation-accept"
                            :disabled="processingCode === invitation.code"
                            @click="acceptInvitation(invitation)"
                        >
                            Accept
                        </Button>
                    </div>
                </Alert>
            </div>
        </DialogContent>
    </Dialog>
</template>
