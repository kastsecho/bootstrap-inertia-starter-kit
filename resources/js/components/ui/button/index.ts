import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';
export { default as ButtonClose } from './ButtonClose.vue';

export const buttonVariants = cva('btn', {
    variants: {
        variant: {
            default: 'btn-solid',
            styled: 'btn-styled',
            outline: 'btn-outline',
            subtle: 'btn-subtle',
            text: 'btn-text',
            link: 'btn-link',
        },
        theme: {
            primary: 'theme-primary',
            accent: 'theme-accent',
            success: 'theme-success',
            danger: 'theme-danger',
            warning: 'theme-warning',
            info: 'theme-info',
            inverse: 'theme-inverse',
            secondary: 'theme-secondary',
        },
        size: {
            default: '',
            sm: 'btn-sm',
            lg: 'btn-lg',
            xs: 'btn-xs',
            icon: 'btn-icon',
            'icon-sm': 'btn-icon btn-sm',
            'icon-lg': 'btn-icon btn-lg',
            'icon-xs': 'btn-icon btn-xs',
        },
    },
    defaultVariants: {
        variant: 'default',
        theme: 'inverse',
        size: 'default',
    },
});
export type ButtonVariants = VariantProps<typeof buttonVariants>;
