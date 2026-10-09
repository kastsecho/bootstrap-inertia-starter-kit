import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Card } from './Card.vue';
export { default as CardContent } from './CardContent.vue';
export { default as CardDescription } from './CardDescription.vue';
export { default as CardFooter } from './CardFooter.vue';
export { default as CardHeader } from './CardHeader.vue';
export { default as CardTitle } from './CardTitle.vue';

export const cardVariants = cva('card', {
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
export type CardVariants = VariantProps<typeof cardVariants>;
