<script setup lang="ts">
import type { LinkComponentBaseProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineProps<{
    href?: LinkComponentBaseProps['href'];
}>();

const page = usePage();
const name = computed(() => page.props.name);
</script>

<template>
    <Link class="navbar-brand theme-danger" :href="href">
        <AppLogoIcon :size="24" />
        <span class="visually-hidden">{{ name }}</span>
    </Link>
</template>
