<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'dialog',
});

const isOpen = defineModel<boolean>('open', { default: false });
</script>

<template>
    <Primitive
        data-slot="dialog"
        v-dialog="{
            open: isOpen,
            onHidden: () => (isOpen = false),
        }"
        :as="as"
        :as-child="asChild"
        :class="cn('dialog', props.class)"
        aria-expanded="false"
    >
        <slot />
    </Primitive>
</template>
