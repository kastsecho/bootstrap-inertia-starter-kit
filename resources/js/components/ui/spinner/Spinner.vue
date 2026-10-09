<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

type Props = {
    variant?: 'border' | 'grow';
    size?: 'sm';
    class?: HTMLAttributes['class'];
};

const props = withDefaults(defineProps<Props>(), {
    variant: 'border',
});
</script>

<template>
    <div
        :class="
            cn(
                {
                    [`spinner-${variant}`]: variant,
                    [`spinner-${size}`]: size,
                },
                props.class,
            )
        "
        role="status"
    >
        <span class="visually-hidden">Loading</span>
    </div>
</template>
