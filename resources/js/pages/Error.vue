<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import { statusCodes } from '@/lib/errors';

const props = defineProps<{
    status?: number;
}>();

const error = computed(
    () =>
        statusCodes[props.status as keyof typeof statusCodes] ??
        statusCodes[500],
);

const errorTitle = computed(() => error.value.title || 'Oh no');
</script>

<template>
    <Head :title="errorTitle" />
    <ErrorLayout :image="{ src: error.image, alt: errorTitle }">
        <template #code>{{ status }}</template>

        <template #message>{{ error.message }}</template>
    </ErrorLayout>
</template>
