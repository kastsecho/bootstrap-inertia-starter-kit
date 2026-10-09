<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'p',
});
</script>

<template>
    <Primitive
        data-slot="dialog-description"
        :as="as"
        :as-child="asChild"
        :class="cn('fg-secondary', props.class)"
    >
        <slot />
    </Primitive>
</template>
