<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Dashboard" />
    <div>Dashboard</div>
</template>
