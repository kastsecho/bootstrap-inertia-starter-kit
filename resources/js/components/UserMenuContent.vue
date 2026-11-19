<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { LogOut, Settings } from '@lucide/vue';
import { computed } from 'vue';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import UserInfo from '@/components/UserInfo.vue';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { Team, User } from '@/types';

defineProps<{
    user: User;
}>();

const page = usePage();
const currentTeam = computed(() => page.props.currentTeam as Team | null);

const handleLogout = () => {
    router.flushAll();
};
</script>

<template>
    <DropdownMenuLabel class="fw-normal p-0">
        <div
            class="d-flex align-items-center gap-4 px-1 py-2 text-start text-sm"
        >
            <UserInfo :user="user" :team="currentTeam" />
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem as-child>
        <Link :href="edit()" prefetch>
            <Settings class="icon" />
            Settings
        </Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem as-child theme="danger">
        <Link
            :href="logout()"
            @click="handleLogout"
            as="button"
            data-test="logout-button"
        >
            <LogOut class="icon" />
            Log out
        </Link>
    </DropdownMenuItem>
</template>
