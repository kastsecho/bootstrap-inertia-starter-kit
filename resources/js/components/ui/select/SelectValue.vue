<script setup lang="ts">
import type { SelectValueProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectValueProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'span',
});
</script>

<template>
    <Primitive
        data-slot="select-value"
        :as="as"
        :as-child="asChild"
        :class="cn('combobox-value', props.class)"
    >
        {{ placeholder }}
    </Primitive>
</template>
