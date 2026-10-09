<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { AvatarFallbackProps } from 'reka-ui';
import { AvatarFallback } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends AvatarFallbackProps {
    class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <AvatarFallback
        data-slot="avatar-fallback"
        v-bind="delegatedProps"
        :class="cn(props.class)"
    >
        <slot />
    </AvatarFallback>
</template>
