<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ToastVariants } from '@/components/ui/toast';
import { toastVariants } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';

interface Props extends PrimitiveProps {
    autohide?: boolean;
    delay?: number;
    theme?: ToastVariants['theme'];
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    autohide: true,
    delay: 5000,
});

const delegatedProps = reactiveOmit(props, 'class', 'theme');
</script>

<template>
    <Primitive
        data-slot="toast"
        v-toast="delegatedProps"
        :as="as"
        :as-child="asChild"
        :class="cn(toastVariants({ theme }), props.class)"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
    >
        <slot />
    </Primitive>
</template>
