export type Appearance = 'light' | 'dark' | 'system';

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    id: string | number;
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
    created_at: Date;
};
