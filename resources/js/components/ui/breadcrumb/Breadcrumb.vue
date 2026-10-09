<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'nav',
});
</script>

<template>
    <Primitive
        data-slot="breadcrumb"
        :as="as"
        :as-child="asChild"
        :class="cn(props.class)"
        aria-label="breadcrumb"
    >
        <slot />
    </Primitive>
</template>
