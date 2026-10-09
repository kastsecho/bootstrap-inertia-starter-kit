<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppShell from '@/components/AppShell.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <AppShell variant="header">
        <AppHeader />
        <AppContent variant="header">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="md:col-8">
                        <Card>
                            <CardHeader>
                                {{ title }}
                            </CardHeader>

                            <CardContent>
                                <CardDescription class="fg-secondary">
                                    {{ description }}
                                </CardDescription>
                                <slot />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppContent>
    </AppShell>
</template>
