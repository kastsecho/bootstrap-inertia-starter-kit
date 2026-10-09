<script setup lang="ts">
import type { Ref } from 'vue';
import { inject } from 'vue';

const modelValue =
    inject<Ref<string | number | undefined>>('inputOTPModelValue');
</script>

<template>
    <input
        v-model="modelValue"
        data-slot="input-otp-slot"
        type="text"
        class="otp-input"
        aria-label="Verification code"
    />
</template>
