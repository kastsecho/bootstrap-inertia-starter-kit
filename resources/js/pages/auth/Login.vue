<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <Head title="Login" />
    <div>Login</div>
</template>
