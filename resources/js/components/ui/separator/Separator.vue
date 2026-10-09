<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { SeparatorProps } from 'reka-ui';
import { Separator } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SeparatorProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    orientation: 'horizontal',
    decorative: true,
});

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <Separator
        data-slot="separator"
        v-bind="delegatedProps"
        :class="cn('w-100 flex-shrink-0 border', props.class)"
    />
</template>
