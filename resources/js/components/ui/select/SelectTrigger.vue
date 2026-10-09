<script setup lang="ts">
import { ChevronDown } from '@lucide/vue';
import type { AcceptableValue, PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes, Ref } from 'vue';
import { inject } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    invalid?: boolean;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
});

const modelValue =
    inject<Ref<AcceptableValue | AcceptableValue[] | undefined>>(
        'comboboxModelValue',
    );
const multiple = inject<() => boolean | undefined>('comboboxMultiple');
</script>

<template>
    <Primitive
        v-combobox="{ multiple: multiple?.() }"
        :class="
            cn(
                'form-control combobox-toggle',
                { ['is-invalid']: invalid },
                props.class,
            )
        "
        type="button"
        data-bs-toggle="combobox"
        @combobox-change="
            modelValue = ($event as CustomEvent<string | string[]>).detail
        "
    >
        <slot />
        <ChevronDown class="combobox-caret icon" />
    </Primitive>
</template>
