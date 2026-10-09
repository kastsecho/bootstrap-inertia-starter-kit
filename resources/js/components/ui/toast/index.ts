import {
    CircleCheckIcon,
    InfoIcon,
    OctagonXIcon,
    TriangleAlertIcon,
} from '@lucide/vue';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Toast } from './Toast.vue';
export { default as ToastContent } from './ToastContent.vue';
export { default as Toaster } from './Toaster.vue';
export { default as ToastHeader } from './ToastHeader.vue';

export const toastVariants = cva('toast', {
    variants: {
        theme: {
            default: 'theme-primary',
            accent: 'theme-accent',
            success: 'theme-success',
            danger: 'theme-danger',
            warning: 'theme-warning',
            info: 'theme-info',
            inverse: 'theme-inverse',
            secondary: 'theme-secondary',
        },
    },
});
export type ToastVariants = VariantProps<typeof toastVariants>;

export const statusIcons = {
    success: {
        icon: CircleCheckIcon,
        class: 'fg-success',
    },
    info: {
        icon: InfoIcon,
        class: 'fg-info',
    },
    warning: {
        icon: TriangleAlertIcon,
        class: 'fg-warning',
    },
    error: {
        icon: OctagonXIcon,
        class: 'fg-danger',
    },
} as const;
