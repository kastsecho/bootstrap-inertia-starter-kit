<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3';
import { Check, Plus, Users } from '@lucide/vue';
import { computed } from 'vue';
import CreateTeamModal from '@/components/CreateTeamModal.vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { switchMethod } from '@/routes/teams';
import type { Team } from '@/types';

const props = withDefaults(
    defineProps<{
        inHeader?: boolean;
    }>(),
    {
        inHeader: false,
    },
);

const page = usePage();

const currentTeam = computed(() => page.props.currentTeam);
const teams = computed(() => page.props.teams ?? []);

const switchTeam = (team: Team) => {
    const previousTeamSlug = currentTeam.value?.slug;

    router.visit(switchMethod(team.slug), {
        onFinish: () => {
            if (!previousTeamSlug || typeof window === 'undefined') {
                router.reload();

                return;
            }

            const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
            const segment = `/${previousTeamSlug}`;

            if (currentUrl.includes(segment)) {
                router.visit(currentUrl.replace(segment, `/${team.slug}`), {
                    replace: true,
                });

                return;
            }

            router.reload();
        },
    });
};
</script>

<template>
    <DropdownMenu variant="nav-item">
        <DropdownMenuTrigger
            data-test="team-switcher-trigger"
            type="button"
            class="nav-link"
            align="bottom-end"
        >
            <Users v-if="!inHeader" class="icon flex-shrink-0" />
            <span
                :class="
                    props.inHeader
                        ? 'text-truncate fw-medium max-w-[120px]'
                        : 'text-truncate fw-semibold'
                "
            >
                {{ currentTeam?.name ?? 'Select team' }}
            </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="min-w-56">
            <DropdownMenuLabel class="fg-secondary text-xs">
                Teams
            </DropdownMenuLabel>
            <DropdownMenuItem
                v-for="team in teams"
                :key="team.id"
                data-test="team-switcher-item"
                @click="switchTeam(team)"
            >
                {{ team.name }}
                <Check
                    v-if="currentTeam?.id === team.id"
                    class="icon fg-success ms-auto"
                />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <CreateTeamModal>
                <DropdownMenuItem
                    data-test="team-switcher-new-team"
                    @click.stop
                >
                    <Plus class="icon" />
                    <span class="fg-secondary">New team</span>
                </DropdownMenuItem>
            </CreateTeamModal>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
