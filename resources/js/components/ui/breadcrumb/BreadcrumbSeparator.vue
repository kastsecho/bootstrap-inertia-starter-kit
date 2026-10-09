<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <li
        data-slot="breadcrumb-separator"
        role="presentation"
        aria-hidden="true"
        :class="cn('breadcrumb-divider', props.class)"
    >
        <slot />
    </li>
</template>
