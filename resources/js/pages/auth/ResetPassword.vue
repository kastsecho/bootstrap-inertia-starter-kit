<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();
</script>

<template>
    <Head title="Reset Password" />
    <div>Reset Password</div>
</template>
