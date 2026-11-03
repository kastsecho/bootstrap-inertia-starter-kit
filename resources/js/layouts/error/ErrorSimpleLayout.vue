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
    <div class="d-flex min-vh-100 align-items-center justify-content-center">
        <div class="container">
            <div
                class="d-flex flex-column align-items-center justify-content-center"
            >
                <div
                    class="d-flex flex-column align-items-center justify-content-center md:flex-row"
                >
                    <h1 class="mb-0 text-lg">
                        <slot name="code" />
                    </h1>

                    <hr class="border-danger md:d-none w-100 border" />
                    <div
                        class="vr border-danger d-none md:d-block mx-4 border"
                    ></div>

                    <div class="fg-secondary text-center text-lg md:text-start">
                        <slot name="message" />
                    </div>
                </div>

                <Button
                    as-child
                    class="mt-4"
                    size="lg"
                    theme="danger"
                    variant="outline"
                >
                    <Link :href="home()">Go Home</Link>
                </Button>
            </div>
        </div>
    </div>
</template>
