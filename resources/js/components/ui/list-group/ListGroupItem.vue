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
        data-slot="list-group-item"
        :as="as"
        :as-child="asChild"
        :class="cn('list-group-item', props.class)"
    >
        <slot />
    </Primitive>
</template>
