<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    target?: string;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
});
</script>

<template>
    <Primitive
        data-slot="dialog-trigger"
        :as="as"
        :as-child="asChild"
        :class="cn(props.class)"
        :data-bs-toggle="target ? 'dialog' : undefined"
        :data-bs-target="target || undefined"
    >
        <slot />
    </Primitive>
</template>
