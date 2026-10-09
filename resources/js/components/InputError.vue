<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <strong v-show="message" class="invalid-feedback d-block" role="alert">
        <small>{{ message }}</small>
    </strong>
</template>
