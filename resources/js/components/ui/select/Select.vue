<script setup lang="ts">
import type { AcceptableValue, SelectRootProps } from 'reka-ui';
import { provide, toRef, watch } from 'vue';

const props = defineProps<{
    defaultValue?: SelectRootProps['defaultValue'];
    disabled?: SelectRootProps['disabled'];
    multiple?: SelectRootProps['multiple'];
    name?: SelectRootProps['name'];
}>();

const modelValue = defineModel<AcceptableValue | AcceptableValue[]>();
provide('comboboxModelValue', modelValue);
provide('comboboxMultiple', toRef(props, 'multiple'));
provide('comboboxName', toRef(props, 'name'));

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
    <slot />
</template>
