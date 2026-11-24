import type { Directive } from 'vue';
import type {
    DialogOptions,
    ToastOptions,
    TooltipOptions,
} from '@/lib/directives';
import type { Auth } from '@/types/auth';
import type { Team } from '@/types/teams';

// Extend ImportMeta interface for Vite...
declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            currentTeam: Team | null;
            teams: Team[];
            [key: string]: unknown;
        };
    }
}

declare module 'vue' {
    interface GlobalDirectives {
        vFocus: Directive<HTMLElement, boolean | undefined>;
        vCombobox: Directive<HTMLElement>;
        vDialog: Directive<HTMLElement, DialogOptions>;
        vOtp: Directive<HTMLElement>;
        vDrawer: Directive<HTMLElement>;
        vMenu: Directive<HTMLElement, string | undefined>;
        vToast: Directive<HTMLElement, ToastOptions>;
        vTooltip: Directive<HTMLElement, TooltipOptions>;
    }

    interface ComponentCustomProperties {
        $inertia: typeof Router;
        $page: Page;
        $headManager: ReturnType<typeof createHeadManager>;
    }
}
