import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Avatar } from './Avatar.vue';
export { default as AvatarFallback } from './AvatarFallback.vue';
export { default as AvatarImage } from './AvatarImage.vue';

export const avatarVariants = cva('avatar', {
    variants: {
        theme: {
            primary: 'theme-primary',
            accent: 'theme-accent',
            success: 'theme-success',
            danger: 'theme-danger',
            warning: 'theme-warning',
            info: 'theme-info',
            inverse: 'theme-inverse',
            default: 'theme-secondary',
        },
        size: {
            default: '',
            sm: 'avatar-sm',
            lg: 'avatar-lg',
            xl: 'avatar-xl',
            xs: 'avatar-xs',
        },
    },
    defaultVariants: {
        theme: 'default',
        size: 'default',
    },
});
export type AvatarVariants = VariantProps<typeof avatarVariants>;

export const statusVariants = cva('avatar-status', {
    variants: {
        theme: {
            online: 'status-online',
            offline: 'status-offline',
            busy: 'status-busy',
            away: 'status-away',
        },
    },
    defaultVariants: {
        theme: 'online',
    },
});
export type StatusVariants = VariantProps<typeof statusVariants>;

export const AvatarStatus = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    away: 'Away',
};
