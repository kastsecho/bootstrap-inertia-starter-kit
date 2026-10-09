<script setup lang="ts">
type Props = {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
};

withDefaults(defineProps<Props>(), {
    variant: 'default',
});
</script>

<template>
    <header :class="variant === 'small' ? '' : 'mb-5 space-y-1'">
        <h2
            :class="
                variant === 'small'
                    ? 'text-md fw-medium mb-0.5 mb-1 text-base font-medium'
                    : 'fw-semibold text-lg'
            "
        >
            {{ title }}
        </h2>
        <p v-if="description" class="fg-secondary mb-0 text-sm">
            {{ description }}
        </p>
    </header>
</template>
