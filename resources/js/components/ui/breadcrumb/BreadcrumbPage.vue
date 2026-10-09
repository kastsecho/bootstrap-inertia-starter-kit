<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <a
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled="true"
        aria-current="page"
        :class="cn('breadcrumb-link', 'active', props.class)"
        href="#"
    >
        <slot />
    </a>
</template>
