<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'h1',
});
</script>

<template>
    <Primitive
        data-slot="dialog-title"
        :as="as"
        :as-child="asChild"
        :class="cn('dialog-title', props.class)"
    >
        <slot />
    </Primitive>
</template>
