<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { ref, watch, watchEffect } from 'vue';
import { cn } from '@/lib/utils';

type CheckboxState = AcceptableValue[] | boolean;

const props = defineProps<{
    disabled?: boolean;
    value?: AcceptableValue;
    id?: string;
    name?: string;
    defaultValue?: CheckboxState;
    indeterminate?: boolean;
    invalid?: boolean;
    class?: HTMLAttributes['class'];
}>();

const checkbox = ref<HTMLInputElement>();

const modelValue = defineModel<CheckboxState>();

watch(
    () => props.defaultValue,
    (newValue, oldValue) => {
        if (modelValue.value == null || modelValue.value === oldValue) {
            modelValue.value = newValue;
        }
    },
    { immediate: true },
);

watchEffect(() => {
    if (checkbox.value) {
        checkbox.value.indeterminate = props.indeterminate ?? false;
    }
});
</script>

<template>
    <input
        ref="checkbox"
        v-model="modelValue"
        data-slot="checkbox"
        :id="id"
        type="checkbox"
        :name="name"
        :class="cn('check', { 'is-invalid': invalid }, props.class)"
        :value="value"
        :disabled="disabled"
    />
</template>
