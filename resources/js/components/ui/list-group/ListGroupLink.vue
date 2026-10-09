<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    active?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'a',
});
</script>

<template>
    <Primitive
        data-slot="list-group-link"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                'list-group-item',
                'list-group-item-action',
                { active: active, disabled: disabled },
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
