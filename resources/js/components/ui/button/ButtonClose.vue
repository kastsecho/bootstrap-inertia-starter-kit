<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    dismiss: string;
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <button
        data-slot="button-close"
        type="button"
        :class="cn('btn-close', props.class)"
        :data-bs-dismiss="dismiss"
        aria-label="Close"
    ></button>
</template>
