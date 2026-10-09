import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as DropdownMenu } from './DropdownMenu.vue';
export { default as DropdownMenuContent } from './DropdownMenuContent.vue';
export { default as DropdownMenuItem } from './DropdownMenuItem.vue';
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue';
export { default as DropdownMenuTrigger } from './DropdownMenuTrigger.vue';
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue';

export const dropdownMenuVariants = cva('menu-item', {
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
export type DropdownMenuVariants = VariantProps<typeof dropdownMenuVariants>;
