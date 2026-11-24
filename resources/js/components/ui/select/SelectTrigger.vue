<script setup lang="ts">
import { ChevronDown } from '@lucide/vue';
import type { AcceptableValue, SelectValueProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes, Ref } from 'vue';
import { inject } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectValueProps {
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
const multiple = inject<Ref<boolean | undefined>>('comboboxMultiple');
const name = inject<Ref<string | undefined>>('comboboxName');
</script>

<template>
    <Primitive
        v-combobox
        :class="
            cn(
                'form-control combobox-toggle',
                { ['is-invalid']: invalid },
                props.class,
            )
        "
        type="button"
        data-bs-toggle="combobox"
        :data-bs-multiple="multiple"
        :data-bs-name="name"
        :data-bs-placeholder="placeholder"
        @combobox-change="
            modelValue = ($event as CustomEvent<string | string[]>).detail
        "
    >
        <slot />
        <ChevronDown class="combobox-caret icon" />
    </Primitive>
</template>
