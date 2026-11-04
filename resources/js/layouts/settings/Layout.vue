<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { ListGroup, ListGroupLink } from '@/components/ui/list-group';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import { index as teams } from '@/routes/teams';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
    },
    {
        title: 'Security',
        href: editSecurity(),
    },
    {
        title: 'Teams',
        href: teams(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

const { isCurrentOrParentUrl } = useCurrentUrl();
</script>

<template>
    <div class="container">
        <Heading
            title="Settings"
            description="Manage your profile and account settings"
        />

        <div class="row space-y-5 md:space-y-0">
            <aside class="md:col-4 lg:col-3">
                <ListGroup class="shadow-sm">
                    <ListGroupLink
                        v-for="item in sidebarNavItems"
                        :key="toUrl(item.href)"
                        :active="isCurrentOrParentUrl(item.href)"
                        as-child
                    >
                        <Link :href="item.href">
                            <component :is="item.icon" class="icon" />
                            {{ item.title }}
                        </Link>
                    </ListGroupLink>
                </ListGroup>
            </aside>

            <section class="md:col-8 lg:col-6">
                <slot />
            </section>
        </div>
    </div>
</template>
