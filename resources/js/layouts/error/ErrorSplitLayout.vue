<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { ImgHTMLAttributes } from 'vue';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

defineProps<{
    image: ImgHTMLAttributes;
}>();
</script>

<template>
    <div class="d-flex flex-column min-vh-100 md:flex-row">
        <div class="col d-flex flex-column">
            <div class="d-grid h-100 w-100 place-items-center">
                <div class="px-5 md:col-6 md:px-0 lg:col-8">
                    <div class="text-4xl"><slot name="code" /></div>

                    <hr class="border-danger w-25 border-3" />

                    <p class="fw-light fg-secondary mb-8 text-lg">
                        <slot name="message" />
                    </p>

                    <Button as-child size="lg" theme="danger" variant="outline">
                        <Link :href="home()">Go Home</Link>
                    </Button>
                </div>
            </div>
        </div>

        <div
            class="col d-flex align-items-center justify-content-center overflow-hidden"
        >
            <img v-bind="image" class="object-fit-cover h-100 w-100" />
        </div>
    </div>
</template>
