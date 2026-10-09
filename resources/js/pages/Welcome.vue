<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { Menu } from '@lucide/vue';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { ButtonClose } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */
import type { NavItem } from '@/types';
import { toUrl } from '@/lib/utils';

defineProps<{
    laravel?: string;
}>();

const page = usePage();
const appName = computed(() => page.props.name);
const auth = computed(() => page.props.auth);

const mainNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs',
    },
    {
        title: 'Laracasts',
        href: 'https://laracasts.com',
    },
    {
        title: 'Deploy now',
        href: 'https://cloud.laravel.com',
    },
    {
        title: 'View changelog',
        href: 'https://github.com/laravel/framework/blob/13.x/CHANGELOG.md',
    },
];
</script>

<template>
    <Head title="Welcome" />

    <div class="d-grid vh-100 place-items-center">
        <NavigationMenu class="fixed-top shadow-sm" expand="md">
            <div class="container">
                <AppLogo href="#" />
                <SheetTrigger target="navbarDrawer">
                    <Menu :size="20" />
                </SheetTrigger>

                <Sheet
                    class="drawer-bottom"
                    tabindex="-1"
                    id="navbarDrawer"
                    aria-labelledby="navbarDrawerLabel"
                >
                    <SheetHeader class="border-bottom">
                        <SheetTitle
                            class="visually-hidden"
                            id="navbarDrawerLabel"
                        >
                            Navigation menu
                        </SheetTitle>
                        <AppLogoIcon class-name="fg-danger" :size="20" />
                        <ButtonClose dismiss="drawer" />
                    </SheetHeader>
                    <SheetContent class="mb-2 md:mb-0">
                        <!-- Left Side Of Navbar -->
                        <NavigationMenuList class="md:me-auto">
                        </NavigationMenuList>

                        <!-- Right Side Of Navbar -->
                        <NavigationMenuList
                            class="text-uppercase text-sm md:ms-auto"
                        >
                            <NavigationMenuItem v-if="auth.user">
                                <NavigationMenuLink
                                    :as="Link"
                                    :href="dashboard()"
                                >
                                    Dashboard
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <template v-else>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        :as="Link"
                                        :href="login()"
                                    >
                                        Login
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <!-- @chisel-registration -->
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        :as="Link"
                                        :href="register()"
                                    >
                                        Register
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <!-- @end-chisel-registration -->
                            </template>
                        </NavigationMenuList>
                    </SheetContent>
                </Sheet>
            </div>
        </NavigationMenu>

        <div class="text-center">
            <div class="fs-3xl mb-6">
                {{ appName }}
                <small class="fg-danger fs-xl">v{{ laravel }}</small>
            </div>

            <nav
                class="nav nav-pills flex-column rounded-6 w-100 shadow-sm md:flex-row"
            >
                <NavigationMenuLink
                    v-for="item in mainNavItems"
                    :key="item.title"
                    class="text-uppercase text-sm"
                    :href="toUrl(item.href)"
                    target="_blank"
                >
                    {{ item.title }}
                </NavigationMenuLink>
            </nav>
        </div>
    </div>
</template>
