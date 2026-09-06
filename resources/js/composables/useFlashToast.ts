import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import type { FlashToast } from '@/types';

export const toasts = ref<FlashToast[]>([]);

export function dismissToast(id: FlashToast['id']): void {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

export function addToast(
    message: string,
    type: FlashToast['type'] = 'success',
): void {
    const id = toasts.value.length + 1;
    const created_at = new Date();

    toasts.value.push({ id, message, type, created_at });
}

export function initializeFlashToast(): void {
    router.on('flash', (event) => {
        const flash = (event as CustomEvent).detail?.flash;
        const data = flash?.toast as FlashToast | undefined;

        if (!data) {
            return;
        }

        addToast(data.message, data.type);
    });
}
