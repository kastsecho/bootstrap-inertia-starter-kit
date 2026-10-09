<script setup lang="ts">
import type { AppVariant } from '@/types';

type Props = {
    variant?: AppVariant;
};

withDefaults(defineProps<Props>(), {
    variant: 'sidebar',
});
</script>

<template>
    <div
        v-if="variant === 'header'"
        class="d-flex min-vh-100 flex-column w-100"
    >
        <slot />
    </div>
</template>
