<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { LabelProps } from 'reka-ui';
import { Label } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<
    LabelProps & {
        horizontal?: boolean;
        customClassName?: HTMLAttributes['class'];
        class?: HTMLAttributes['class'];
    }
>();

const delegatedProps = reactiveOmit(props, 'class', 'customClassName');
</script>

<template>
    <Label
        data-slot="label"
        v-bind="delegatedProps"
        :class="
            cn(
                {
                    'form-label': !customClassName && !horizontal,
                    'col-form-label': !customClassName && horizontal,
                    [`${customClassName}`]: customClassName,
                },
                props.class,
            )
        "
    >
        <slot />
    </Label>
</template>
