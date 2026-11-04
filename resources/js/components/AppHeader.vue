<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Menu,
    Search,
    LogIn,
    UserPlus,
} from '@lucide/vue';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import TeamSwitcher from '@/components/TeamSwitcher.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ButtonClose } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Tooltip } from '@/components/ui/tooltip';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { getInitials } from '@/composables/useInitials';
import { toUrl } from '@/lib/utils';
import { dashboard, home, login, register } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const auth = computed(() => page.props.auth);
const avatarKey = computed(() => auth.value.user.avatar || 'fallback');
const { isCurrentUrl } = useCurrentUrl();

const dashboardUrl = computed(() =>
    page.props.currentTeam ? dashboard(page.props.currentTeam.slug).url : '/',
);

const mainNavItems = computed<NavItem[]>(() => [
    {
        title: 'Dashboard',
        href: dashboardUrl.value,
        icon: LayoutGrid,
        isActive: !!auth.value.user,
    },
]);

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: BookOpen,
    },
];
</script>

<template>
    <div class="divide-y shadow-sm">
        <NavigationMenu expand="md">
            <div class="container">
                <AppLogo :href="home()" />
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
                            <template
                                v-for="item in mainNavItems"
                                :key="item.title"
                            >
                                <NavigationMenuItem
                                    v-if="item.isActive ?? true"
                                >
                                    <NavigationMenuLink
                                        :as="Link"
                                        class="icon-link"
                                        :href="item.href"
                                        :active="isCurrentUrl(item.href)"
                                    >
                                        <component
                                            v-if="item.icon"
                                            :is="item.icon"
                                            class="icon"
                                        />
                                        {{ item.title }}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </template>
                        </NavigationMenuList>

                        <!-- Right Side Of Navbar -->
                        <NavigationMenuList class="md:ms-auto">
                            <NavigationMenuItem>
                                <NavigationMenuLink class="icon-link">
                                    <Search class="icon" />
                                    <span class="md:d-none">Search</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <template
                                v-for="item in rightNavItems"
                                :key="item.title"
                            >
                                <Tooltip
                                    v-if="item.isActive ?? true"
                                    class="nav-item"
                                    as="li"
                                    :content="item.title"
                                    placement="bottom"
                                >
                                    <NavigationMenuLink
                                        class="icon-link"
                                        :href="toUrl(item.href)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <component
                                            v-if="item.icon"
                                            :is="item.icon"
                                            class="icon"
                                        />
                                        <span class="md:d-none">
                                            {{ item.title }}
                                        </span>
                                    </NavigationMenuLink>
                                </Tooltip>
                            </template>

                            <!-- Authentication Links -->
                            <template v-if="!auth.user">
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        :as="Link"
                                        class="icon-link"
                                        :href="login()"
                                        :active="isCurrentUrl(login())"
                                    >
                                        <LogIn class="icon" />
                                        Login
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <!-- @chisel-registration -->
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        :as="Link"
                                        class="icon-link"
                                        :href="register()"
                                        :active="isCurrentUrl(register())"
                                    >
                                        <UserPlus class="icon" />
                                        Register
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <!-- @end-chisel-registration -->
                            </template>

                            <template v-else>
                                <DropdownMenu variant="nav-item">
                                    <DropdownMenuTrigger
                                        type="button"
                                        class="nav-link"
                                        align="bottom-end"
                                        :caret="false"
                                    >
                                        <Avatar
                                            :key="avatarKey"
                                            size="xs"
                                            status="online"
                                        >
                                            <AvatarImage
                                                v-if="auth.user.avatar"
                                                :src="auth.user.avatar"
                                                :alt="auth.user.name"
                                            />
                                            <AvatarFallback>
                                                {{
                                                    getInitials(auth.user?.name)
                                                }}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent class="min-w-56">
                                        <UserMenuContent :user="auth.user" />
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <TeamSwitcher :in-header="true" />
                            </template>
                        </NavigationMenuList>
                    </SheetContent>
                </Sheet>
            </div>
        </NavigationMenu>
        <NavigationMenu v-if="breadcrumbs.length >= 1" expand>
            <div class="container">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </NavigationMenu>
    </div>
</template>
