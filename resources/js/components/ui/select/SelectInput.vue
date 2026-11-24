<script setup lang="ts">
import type { AcceptableValue, SelectValueProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes, Ref } from 'vue';
import { inject } from 'vue';
import { cn } from '@/lib/utils';

interface Props extends SelectValueProps {
    allowCustom?: boolean;
    invalid?: boolean;
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
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
                {
                    combobox: !multiple,
                    'combobox-control': multiple,
                    'is-invalid': multiple && invalid,
                },
                props.class,
            )
        "
        data-bs-toggle="combobox"
        :data-bs-allow-custom="allowCustom"
        :data-bs-multiple="multiple"
        :data-bs-name="name"
        @combobox-change="
            modelValue = ($event as CustomEvent<string | string[]>).detail
        "
    >
        <input
            :class="
                cn('combobox-input', {
                    'form-control': !multiple,
                    'form-ghost': multiple,
                    'is-invalid': !multiple && invalid,
                })
            "
            type="text"
            :placeholder="placeholder"
        />
    </Primitive>
</template>
