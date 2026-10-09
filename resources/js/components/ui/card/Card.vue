<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { CardVariants } from '@/components/ui/card';
import { cardVariants } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    theme?: CardVariants['theme'];
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
});

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <Primitive
        data-slot="card"
        v-bind="delegatedProps"
        :class="cn(cardVariants({ theme }), props.class)"
    >
        <slot />
    </Primitive>
</template>
