<script setup lang="ts">
import { Head, setLayoutProps } from '@inertiajs/vue3';
import { Alert } from '@/components/ui/alert';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import { dashboard } from '@/routes';

defineProps<{
    status?: string;
}>();

setLayoutProps({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
});
</script>

<template>
    <Head title="Dashboard" />

    <div class="container">
        <div class="row justify-content-center">
            <div class="md:col-8">
                <Card>
                    <CardHeader>Dashboard</CardHeader>

                    <CardContent>
                        <Alert
                            v-if="status"
                            theme="success"
                            class="fw-medium mb-3 text-sm"
                        >
                            <p class="mx-auto">{{ status }}</p>
                        </Alert>

                        <CardDescription class="fg-secondary">
                            You are logged in!
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
