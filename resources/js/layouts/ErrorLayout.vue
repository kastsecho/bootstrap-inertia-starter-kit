<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue';
import ErrorLayout from '@/layouts/error/ErrorSplitLayout.vue';

defineProps<{
    image: ImgHTMLAttributes;
}>();
</script>

<template>
    <ErrorLayout :image="image">
        <template #code>
            <slot name="code" />
        </template>

        <template #message>
            <slot name="message" />
        </template>
    </ErrorLayout>
</template>
