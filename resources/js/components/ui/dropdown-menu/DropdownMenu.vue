<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    variant?: string;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'li',
});
</script>

<template>
    <Primitive
        data-slot="dropdown-menu"
        :as="as"
        :as-child="asChild"
        :class="cn(variant, props.class)"
    >
        <slot />
    </Primitive>
</template>
