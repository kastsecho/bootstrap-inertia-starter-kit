<script setup lang="ts">
import { ChevronsUpDown } from '@lucide/vue';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    align?: string;
    caret?: boolean;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    caret: true,
});
</script>

<template>
    <Primitive
        data-slot="dropdown-menu-trigger"
        v-menu="align"
        :as="as"
        :as-child="asChild"
        :class="cn({ 'align-items-center': caret }, props.class)"
        aria-expanded="false"
    >
        <slot />
        <ChevronsUpDown v-if="caret" class="icon-sm" />
    </Primitive>
</template>
