<script setup lang="ts">
import { AvatarRoot, Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { AvatarVariants } from '@/components/ui/avatar';
import { AvatarStatus, avatarVariants } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const props = defineProps<{
    size?: AvatarVariants['size'];
    theme?: AvatarVariants['theme'];
    status?: keyof typeof AvatarStatus;
    subtle?: boolean;
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <AvatarRoot
        data-slot="avatar"
        :class="
            cn(
                avatarVariants({ size, theme }),
                { ['avatar-subtle']: subtle },
                props.class,
            )
        "
    >
        <slot />

        <Primitive
            v-if="status"
            as="span"
            :class="cn('avatar-status', { [`status-${status}`]: status })"
            role="img"
            :aria-label="AvatarStatus[status] ?? ''"
        />
    </AvatarRoot>
</template>
