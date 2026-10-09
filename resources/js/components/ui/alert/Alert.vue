<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { AlertVariants } from '@/components/ui/alert';
import { alertVariants } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const props = defineProps<{
    theme?: AlertVariants['theme'];
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <div :class="cn(alertVariants({ theme }), props.class)" role="alert">
        <slot />
    </div>
</template>
