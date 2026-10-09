<script setup lang="ts">
import { computed } from 'vue';
import type { AppVariant } from '@/types';

type Props = {
    variant?: AppVariant;
    class?: string;
};

const props = withDefaults(defineProps<Props>(), {
    variant: 'sidebar',
});
const className = computed(() => props.class);
</script>

<template>
    <main v-if="variant === 'header'" class="py-6" :class="className">
        <slot />
    </main>
</template>
