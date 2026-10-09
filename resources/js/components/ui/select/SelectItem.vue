<script setup lang="ts">
import { Check } from '@lucide/vue';
import type { AcceptableValue, SelectItemProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes, Ref } from 'vue';
import { computed, inject } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectItemProps {
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
});

const modelValue =
    inject<Ref<AcceptableValue | AcceptableValue[] | undefined>>(
        'comboboxModelValue',
    );

const selected = computed(() => {
    const currentValue = modelValue?.value;

    return Array.isArray(currentValue)
        ? currentValue.includes(props.value)
        : currentValue === props.value;
});
</script>

<template>
    <Primitive
        data-slot="select-item"
        :as="as"
        :as-child="asChild"
        type="button"
        :data-bs-value="value"
        :disabled="disabled"
        :class="cn('menu-item', { selected }, props.class)"
        :aria-selected="selected"
    >
        <slot />
        <Check class="menu-item-check" :size="16" />
    </Primitive>
</template>
