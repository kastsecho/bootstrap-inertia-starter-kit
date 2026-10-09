<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { provide } from 'vue';
import { cn } from '@/lib/utils';

defineOptions({ inheritAttrs: false });

type Props = {
    connected?: boolean;
    length?: number | null;
    type?: 'numeric' | 'alphanumeric' | 'alpha';
    mask?: boolean;
    groups?: number[] | null;
    separator?: string;
    invalid?: boolean;
    class?: HTMLAttributes['class'];
};

const props = withDefaults(defineProps<Props>(), {
    length: null,
    type: 'numeric',
    groups: null,
    separator: '.',
});

const modelValue = defineModel<string | number>();
provide('inputOTPModelValue', modelValue);

const delegatedProps = reactiveOmit(props, 'class', 'connected', 'invalid');
</script>

<template>
    <div
        v-otp="delegatedProps"
        data-slot="input-otp"
        :class="
            cn(
                'otp',
                {
                    'otp-connected': connected,
                    'otp-rendered is-invalid': invalid,
                },
                props.class,
            )
        "
        @otp-input="
            modelValue = ($event as CustomEvent<string | number>).detail
        "
    >
        <slot />
    </div>
</template>
