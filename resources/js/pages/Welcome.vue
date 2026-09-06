<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps<{
    laravel?: string;
}>();
</script>

<template>
    <Head title="Welcome" />
    <div>Welcome</div>
</template>
