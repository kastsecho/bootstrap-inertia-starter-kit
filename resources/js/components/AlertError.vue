<script setup lang="ts">
import { AlertCircle } from '@lucide/vue';
import { computed } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
    errors: string[];
    title?: string;
};

const props = withDefaults(defineProps<Props>(), {
    title: 'Something went wrong.',
});

const uniqueErrors = computed(() => Array.from(new Set(props.errors)));
</script>

<template>
    <Alert class="vstack space-y-2 divide-y" theme="danger">
        <div class="d-flex align-items-center gap-5">
            <AlertCircle class="icon" />
            <AlertTitle class="mb-0">{{ title }}</AlertTitle>
        </div>
        <AlertDescription class="mb-0">
            <ul class="list-inline text-sm">
                <li v-for="(error, index) in uniqueErrors" :key="index">
                    {{ error }}
                </li>
            </ul>
        </AlertDescription>
    </Alert>
</template>
