<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'li',
});
</script>

<template>
    <Primitive
        data-slot="breadcrumb-item"
        :as="as"
        :as-child="asChild"
        :class="cn('breadcrumb-item', props.class)"
    >
        <slot />
    </Primitive>
</template>
