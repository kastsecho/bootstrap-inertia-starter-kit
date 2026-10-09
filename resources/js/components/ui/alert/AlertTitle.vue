<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'h4',
});
</script>

<template>
    <Primitive
        data-slot="alert-title"
        :as="as"
        :as-child="asChild"
        :class="cn('alert-heading', props.class)"
    >
        <slot />
    </Primitive>
</template>
