<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    target: string;
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <button
        data-slot="sheet-trigger"
        type="button"
        data-bs-toggle="drawer"
        :data-bs-target="`#${target}`"
        :aria-controls="target"
        aria-expanded="false"
        aria-label="Toggle navigation"
        :class="cn('btn-icon navbar-toggler', props.class)"
    >
        <slot>
            <span class="navbar-toggler-icon" aria-hidden="true"></span>
        </slot>
    </button>
</template>
