<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    content: string;
    placement?: string;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'span',
});
</script>

<template>
    <Primitive
        data-slot="tooltip"
        v-tooltip="{ title: content, placement }"
        :as="as"
        :as-child="asChild"
        :class="cn(props.class)"
    >
        <slot />
    </Primitive>
</template>
