<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <dialog data-slot="sheet" v-drawer :class="cn('drawer', props.class)">
        <slot />
    </dialog>
</template>
