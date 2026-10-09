<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { BadgeVariants } from '@/components/ui/badge';
import { badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    theme?: BadgeVariants['theme'];
    class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <Primitive
        data-slot="badge"
        v-bind="delegatedProps"
        :class="cn(badgeVariants({ theme }), props.class)"
    >
        <slot />
    </Primitive>
</template>
