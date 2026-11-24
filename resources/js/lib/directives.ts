import type { Directive, DirectiveBinding } from 'vue';

type AppDirective = Directive<HTMLElement, any>;

const focus = {
    mounted: (
        el: HTMLElement,
        shouldFocus: DirectiveBinding<boolean | undefined>,
    ) => {
        if (shouldFocus.value !== false) {
            el.focus();
        }
    },
};

type ComponentInstance = {
    dispose(): void;
};

type BaseComponent = {
    getInstance(el: HTMLElement): ComponentInstance | null;
};

async function onUnmounted(
    el: HTMLElement,
    callback: () => Promise<{ default: BaseComponent }>,
) {
    const { default: Component } = await callback();

    Component.getInstance(el)?.dispose();
}

const combobox = {
    beforeMount: async (el: HTMLElement) => {
        const placeholder = el
            .querySelector('.combobox-value')
            ?.textContent?.trim();

        if (placeholder) {
            el.setAttribute('data-bs-placeholder', placeholder);
        }
    },

    mounted: async (el: HTMLElement) => {
        const { default: Combobox } =
            await import('bootstrap/js/dist/combobox');

        el.addEventListener('change.bs.combobox', (event) => {
            el.dispatchEvent(
                new CustomEvent('combobox-change', {
                    detail: (
                        event as Event & {
                            value: string | string[];
                        }
                    ).value,
                }),
            );
        });

        Combobox.getOrCreateInstance(el);
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/combobox')),
};

export type DialogOptions = {
    open?: boolean;
    onHidden?: () => void;
};

const dialog = {
    mounted: async (
        el: HTMLElement,
        options: DirectiveBinding<DialogOptions>,
    ) => {
        const { default: Dialog } = await import('bootstrap/js/dist/dialog');

        const dialog = Dialog.getOrCreateInstance(el);

        el.addEventListener('hidden.bs.dialog', () => {
            options.value.onHidden?.();
        });

        if (options.value.open === true) {
            await dialog.show();
        }
    },

    updated: async (
        el: HTMLElement,
        options: DirectiveBinding<DialogOptions>,
    ) => {
        if (options.value.open === options.oldValue?.open) return;

        const { default: Dialog } = await import('bootstrap/js/dist/dialog');

        const dialog = Dialog.getOrCreateInstance(el);

        if (options.value.open === true) {
            await dialog.show();
        } else if (options.value.open === false) {
            await dialog.hide();
        }
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/dialog')),
};

const drawer = {
    mounted: async (el: HTMLElement) => {
        const { default: Drawer } = await import('bootstrap/js/dist/drawer');

        Drawer.getOrCreateInstance(el);
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/drawer')),
};

const menu = {
    mounted: async (
        el: HTMLElement,
        options: DirectiveBinding<string | undefined>,
    ) => {
        const { default: Menu } = await import('bootstrap/js/dist/menu');

        const placement = options.value;

        el.setAttribute('data-bs-toggle', 'menu');

        Menu.getOrCreateInstance(el, {
            ...(placement && { placement }),
        });
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/menu')),
};

export type OtpOptions = {
    length?: number | null;
    type?: 'numeric' | 'alphanumeric' | 'alpha';
    mask?: boolean;
    groups?: number[] | null;
    separator?: string;
};

const otp = {
    mounted: async (el: HTMLElement, options: DirectiveBinding<OtpOptions>) => {
        const { default: OtpInput } =
            await import('bootstrap/js/dist/otp-input');

        el.addEventListener('input.bs.otpInput', (event) => {
            el.dispatchEvent(
                new CustomEvent('otp-input', {
                    detail: (event as Event & { value: string | number }).value,
                }),
            );
        });

        OtpInput.getOrCreateInstance(el, options.value);
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/otp-input')),
};

export type ToastOptions = {
    autohide?: boolean;
    delay?: number;
};

const toast = {
    mounted: async (
        el: HTMLElement,
        options: DirectiveBinding<ToastOptions>,
    ) => {
        const { default: Toast } = await import('bootstrap/js/dist/toast');

        el.addEventListener('hidden.bs.toast', () => {
            el.dispatchEvent(new CustomEvent('hidden'));
        });

        const toast = Toast.getOrCreateInstance(el, options.value);
        await toast.show();
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/toast')),
};

export type TooltipOptions = {
    title: string;
    placement?: string;
};

const tooltip = {
    mounted: async (
        el: HTMLElement,
        options: DirectiveBinding<TooltipOptions>,
    ) => {
        const { default: Tooltip } = await import('bootstrap/js/dist/tooltip');

        Tooltip.getOrCreateInstance(el, {
            title: options.value.title,
            ...(options.value.placement && {
                placement: options.value.placement,
            }),
        });
    },

    unmounted: (el: HTMLElement) =>
        onUnmounted(el, () => import('bootstrap/js/dist/tooltip')),
};

export const appDirectives: Record<string, AppDirective> = {
    focus,
    combobox,
    dialog,
    drawer,
    menu,
    otp,
    toast,
    tooltip,
};
