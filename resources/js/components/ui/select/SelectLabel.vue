<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectLabelProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
});
</script>

<template>
    <Primitive
        data-slot="select-label"
        :as="as"
        :as-child="asChild"
        :class="cn('menu-header', props.class)"
    >
        <slot />
    </Primitive>
</template>
