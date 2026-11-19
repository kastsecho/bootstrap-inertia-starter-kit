<script setup lang="ts">
import { Head, Link, setLayoutProps } from '@inertiajs/vue3';
import { Eye, Pencil, Plus } from '@lucide/vue';
import CreateTeamModal from '@/components/CreateTeamModal.vue';
import Heading from '@/components/Heading.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { edit, index } from '@/routes/teams';
import type { Team } from '@/types';
import { ListGroup, ListGroupItem } from '@/components/ui/list-group';

defineProps<{
    teams: Team[];
}>();

setLayoutProps({
    breadcrumbs: [
        {
            title: 'Teams',
            href: index(),
        },
    ],
});
</script>

<template>
    <Head title="Teams" />

    <h1 class="visually-hidden">Teams</h1>

    <div class="d-flex flex-column space-y-5">
        <div class="d-flex align-items-center justify-content-between">
            <Heading
                variant="small"
                title="Teams"
                description="Manage your teams and team memberships"
            />

            <CreateTeamModal>
                <Button data-test="teams-new-team-button">
                    <Plus /> New team
                </Button>
            </CreateTeamModal>
        </div>

        <ListGroup v-if="teams.length > 0">
            <ListGroupItem
                v-for="team in teams"
                :key="team.id"
                data-test="team-row"
                class="d-flex align-items-center justify-content-between"
            >
                <div class="flex items-center gap-4">
                    <div>
                        <div class="d-flex align-items-center gap-3">
                            <span class="fw-medium">{{ team.name }}</span>
                            <Badge v-if="team.isPersonal" theme="secondary">
                                Personal
                            </Badge>
                        </div>
                        <span class="fg-secondary text-sm">
                            {{ team.roleLabel }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <Tooltip
                        v-if="team.role === 'member'"
                        content="View team"
                        placement="left"
                    >
                        <Button
                            data-test="team-view-button"
                            variant="text"
                            size="icon-sm"
                            as-child
                        >
                            <Link :href="edit(team.slug)">
                                <Eye class="icon" />
                            </Link>
                        </Button>
                    </Tooltip>

                    <Tooltip v-else content="Edit team" placement="left">
                        <Button
                            data-test="team-edit-button"
                            variant="text"
                            size="icon-sm"
                            as-child
                        >
                            <Link :href="edit(team.slug)">
                                <Pencil class="icon" />
                            </Link>
                        </Button>
                    </Tooltip>
                </div>
            </ListGroupItem>
        </ListGroup>

        <p v-else class="fg-secondary text-center">
            You don't belong to any teams yet.
        </p>
    </div>
</template>
