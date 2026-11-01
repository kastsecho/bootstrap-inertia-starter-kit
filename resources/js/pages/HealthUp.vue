<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/vue3';

const props = defineProps<{
    exception?: string;
    renderTime?: number;
}>();

const appStatus = computed(() =>
    props.exception ? 'experiencing problems' : 'up',
);
const spinnerClass = computed(() =>
    props.exception ? 'fg-danger' : 'fg-success',
);
</script>

<template>
    <Head title="Health Check" />
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="-fluid container">
            <div class="row justify-content-center">
                <div class="md:col-10 lg:col-10 xl:col-6">
                    <Card>
                        <CardContent>
                            <div class="d-flex align-items-center gap-6">
                                <Spinner
                                    :class="cn('border border-2', spinnerClass)"
                                    variant="grow"
                                    aria-hidden="true"
                                />

                                <div>
                                    <h2
                                        class="fg-emphasis-secondary fw-semibold text-lg"
                                    >
                                        Application {{ appStatus }}
                                    </h2>

                                    <p class="fg-secondary mt-2 mb-0 text-sm">
                                        HTTP request received.

                                        <template
                                            v-if="renderTime !== undefined"
                                        >
                                            Response rendered in
                                            {{ renderTime }}ms.
                                        </template>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>
