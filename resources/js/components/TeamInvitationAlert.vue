<script setup lang="ts">
import { Info } from '@lucide/vue';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { TeamInvitationContext } from '@/types';

type Props = {
    invitation: TeamInvitationContext;
    action: 'Log in' | 'Register';
};

defineProps<Props>();
</script>

<template>
    <div data-test="team-invitation-alert">
        <Alert class="d-flex align-items-center gap-5" theme="default">
            <Info class="icon" />
            <AlertDescription class="mb-0">
                {{ action }} to join the "{{ invitation.teamName }}" Team.
            </AlertDescription>
        </Alert>
    </div>
</template>
