<script setup lang="ts">
import type { AcceptableValue, SelectRootProps } from 'reka-ui';
import { provide, watch } from 'vue';

const props = defineProps<{
    defaultValue?: SelectRootProps['defaultValue'];
    disabled?: SelectRootProps['disabled'];
    multiple?: SelectRootProps['multiple'];
    name?: SelectRootProps['name'];
}>();

const modelValue = defineModel<AcceptableValue | AcceptableValue[]>();
provide('comboboxModelValue', modelValue);
provide('comboboxMultiple', () => props.multiple);

watch(
    () => props.defaultValue,
    (newValue, oldValue) => {
        const matchesPrevious =
            Array.isArray(modelValue.value) && Array.isArray(oldValue)
                ? modelValue.value.length === oldValue.length &&
                  modelValue.value.every(
                      (value, index) => value === oldValue[index],
                  )
                : modelValue.value === oldValue;

        if (modelValue.value == null || matchesPrevious) {
            modelValue.value = newValue;
        }
    },
    { immediate: true },
);
</script>

<template>
    <template v-if="name && !disabled">
        <template v-if="multiple">
            <input
                v-for="value in Array.isArray(modelValue) ? modelValue : []"
                :key="value"
                type="hidden"
                :name="`${name}[]`"
                :value="value"
            />
        </template>
        <input v-else type="hidden" :name="name" :value="modelValue ?? ''" />
    </template>

    <slot />
</template>
