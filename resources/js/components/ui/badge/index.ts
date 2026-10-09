import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva('badge', {
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
    defaultVariants: {
        theme: 'default',
    },
});
export type BadgeVariants = VariantProps<typeof badgeVariants>;
