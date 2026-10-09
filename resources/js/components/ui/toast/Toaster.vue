<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import { computed } from 'vue';
import { ButtonClose } from '@/components/ui/button';
import {
    statusIcons,
    Toast,
    ToastContent,
    ToastHeader,
} from '@/components/ui/toast';
import { dismissToast, toasts } from '@/composables/useFlashToast';
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';

interface Props extends PrimitiveProps {
    autohide?: boolean;
    delay?: number;
    variant?: 'default' | 'compact';
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    autohide: true,
    delay: 5000,
    variant: 'default',
});

const page = usePage();
const name = computed(() => page.props.name);

const toastProps = reactiveOmit(props, 'class', 'as', 'asChild', 'variant');
</script>

<template>
    <Primitive
        data-slot="toaster"
        :as="as"
        :as-child="asChild"
        :class="cn('toast-container', props.class)"
    >
        <template v-if="variant === 'compact'">
            <Toast
                v-for="toast in toasts"
                :key="toast.id"
                v-bind="toastProps"
                @hidden="dismissToast(toast.id)"
            >
                <div class="d-flex justify-content-between">
                    <ToastContent>
                        <component
                            :is="statusIcons[toast.type].icon"
                            :class="cn('me-2', statusIcons[toast.type].class)"
                            :size="16"
                        />
                        {{ toast.message }}
                    </ToastContent>
                    <ButtonClose
                        v-if="!autohide"
                        class="ms-auto me-4"
                        dismiss="toast"
                    />
                </div>
            </Toast>
        </template>

        <template v-else>
            <Toast
                v-for="toast in toasts"
                :key="toast.id"
                v-bind="toastProps"
                @hidden="dismissToast(toast.id)"
            >
                <ToastHeader>
                    <component
                        :is="statusIcons[toast.type].icon"
                        :class="cn('me-2', statusIcons[toast.type].class)"
                        :size="16"
                    />
                    <strong class="me-auto">{{ name }}</strong>
                    <small>{{ toast.created_at.toLocaleTimeString() }}</small>
                    <ButtonClose v-if="!autohide" dismiss="toast" />
                </ToastHeader>
                <ToastContent>
                    {{ toast.message }}
                </ToastContent>
            </Toast>
        </template>
    </Primitive>
</template>
