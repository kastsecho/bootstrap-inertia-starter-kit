<script setup lang="ts">
import type { PrimitiveProps, SelectContentProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectContentProps, PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'span',
});
</script>

<template>
    <Primitive
        data-slot="select-content"
        :as="as"
        :as-child="asChild"
        :class="cn('menu', props.class)"
    >
        <slot />
    </Primitive>
</template>
