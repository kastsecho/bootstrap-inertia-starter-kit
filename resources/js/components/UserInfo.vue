<script setup lang="ts">
import { computed } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/composables/useInitials';
import type { Team, User } from '@/types';

type Props = {
    user: User;
    showEmail?: boolean;
    team?: Team | null;
};

const props = withDefaults(defineProps<Props>(), {
    showEmail: false,
    team: null,
});

const { getInitials } = useInitials();

// Compute whether we should show the avatar image
const showAvatar = computed(
    () => props.user.avatar && props.user.avatar !== '',
);
</script>

<template>
    <Avatar size="sm" status="online">
        <AvatarImage v-if="showAvatar" :src="user.avatar!" :alt="user.name" />
        <AvatarFallback class="rounded-lg text-black dark:text-white">
            {{ getInitials(user.name) }}
        </AvatarFallback>
    </Avatar>

    <div class="d-grid not-prose flex-grow-1 text-left text-sm">
        <span class="text-truncate fw-medium">{{ user.name }}</span>
        <span v-if="team" class="fg-secondary text-truncate text-xs">
            {{ team.name }}
        </span>
        <span v-else-if="showEmail" class="fg-secondary text-truncate text-xs">
            {{ user.email }}
        </span>
    </div>
</template>
