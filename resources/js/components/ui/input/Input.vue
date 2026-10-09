<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { watch } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    ghost?: boolean;
    defaultValue?: string | number;
    invalid?: boolean;
    class?: HTMLAttributes['class'];
}>();

const modelValue = defineModel<string | number>();

watch(
    () => props.defaultValue,
    (newValue, oldValue) => {
        if (modelValue.value == null || modelValue.value === oldValue) {
            modelValue.value = newValue;
        }
    },
    { immediate: true },
);
</script>

<template>
    <input
        v-model="modelValue"
        data-slot="input"
        :class="
            cn(
                {
                    'form-control': !ghost,
                    'form-ghost': ghost,
                    'is-invalid': invalid,
                },
                props.class,
            )
        "
    />
</template>
