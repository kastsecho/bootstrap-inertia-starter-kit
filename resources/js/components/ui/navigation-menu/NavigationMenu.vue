<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    expand?: boolean | string;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'nav',
});

const delegatedProps = reactiveOmit(props, 'class', 'expand');
</script>

<template>
    <Primitive
        data-slot="navigation-menu"
        v-bind="delegatedProps"
        :class="
            cn(
                'navbar',
                { 'navbar-expand': expand === true },
                { [`${expand}:navbar-expand`]: typeof expand === 'string' },
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
