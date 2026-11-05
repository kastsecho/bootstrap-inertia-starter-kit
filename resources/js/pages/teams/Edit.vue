<script setup lang="ts">
import { Form, Head, router, setLayoutProps } from '@inertiajs/vue3';
import { ChevronDown, Mail, UserPlus, X } from '@lucide/vue';
import { computed, ref } from 'vue';
import CancelInvitationModal from '@/components/CancelInvitationModal.vue';
import DeleteTeamModal from '@/components/DeleteTeamModal.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import InviteMemberModal from '@/components/InviteMemberModal.vue';
import RemoveMemberModal from '@/components/RemoveMemberModal.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListGroup, ListGroupItem } from '@/components/ui/list-group';
import { Tooltip } from '@/components/ui/tooltip';
import { useInitials } from '@/composables/useInitials';
import { edit, index, update } from '@/routes/teams';
import { update as updateMember } from '@/routes/teams/members';
import type {
    RoleOption,
    Team,
    TeamInvitation,
    TeamMember,
    TeamPermissions,
} from '@/types';

const props = defineProps<{
    team: Team;
    members: TeamMember[];
    invitations: TeamInvitation[];
    permissions: TeamPermissions;
    availableRoles: RoleOption[];
}>();

setLayoutProps({
    breadcrumbs: [
        {
            title: 'Teams',
            href: index(),
        },
        {
            title: props.team.name,
            href: edit(props.team.slug),
        },
    ],
});

const { getInitials } = useInitials();

const inviteDialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const removeMemberDialogOpen = ref(false);
const memberToRemove = ref<TeamMember | null>(null);
const cancelInvitationDialogOpen = ref(false);
const invitationToCancel = ref<TeamInvitation | null>(null);

const pageTitle = computed(() =>
    props.permissions.canUpdateTeam
        ? `Edit ${props.team.name}`
        : `View ${props.team.name}`,
);

const updateMemberRole = (member: TeamMember, newRole: string) => {
    router.visit(updateMember([props.team.slug, member.id]), {
        data: { role: newRole },
        preserveScroll: true,
    });
};

const confirmRemoveMember = (member: TeamMember) => {
    memberToRemove.value = member;
    removeMemberDialogOpen.value = true;
};

const confirmCancelInvitation = (invitation: TeamInvitation) => {
    invitationToCancel.value = invitation;
    cancelInvitationDialogOpen.value = true;
};
</script>

<template>
    <Head :title="pageTitle" />

    <h1 class="visually-hidden">{{ pageTitle }}</h1>

    <div class="d-flex flex-column space-y-5">
        <!-- Team Name Section -->
        <div v-if="permissions.canUpdateTeam" class="space-y-5">
            <Heading
                variant="small"
                title="Team settings"
                description="Update your team name and settings"
            />

            <Form
                v-bind="update.form(team.slug)"
                class="space-y-6"
                v-slot="{ errors, processing }"
            >
                <div class="d-grid form-field">
                    <Label for="name">Team name</Label>
                    <Input
                        id="name"
                        name="name"
                        data-test="team-name-input"
                        :default-value="team.name"
                        required
                        :invalid="!!errors.name"
                    />
                    <InputError :message="errors.name" />
                </div>

                <div class="d-flex align-items-center gap-5">
                    <Button
                        type="submit"
                        data-test="team-save-button"
                        :disabled="processing"
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>

        <div v-else class="space-y-5">
            <Heading variant="small" :title="team.name" />
        </div>

        <!-- Members Section -->
        <div class="space-y-5">
            <div class="d-flex align-items-center justify-content-between">
                <Heading
                    variant="small"
                    title="Team members"
                    :description="
                        permissions.canCreateInvitation
                            ? 'Manage who belongs to this team'
                            : ''
                    "
                />

                <Button
                    v-if="permissions.canCreateInvitation"
                    data-test="invite-member-button"
                    @click="inviteDialogOpen = true"
                >
                    <UserPlus class="icon" /> Invite member
                </Button>
            </div>

            <ListGroup>
                <ListGroupItem
                    v-for="member in members"
                    :key="member.id"
                    data-test="member-row"
                    class="d-flex align-items-center justify-content-between"
                >
                    <div class="d-flex align-items-center gap-4">
                        <Avatar size="sm">
                            <AvatarImage
                                v-if="member.avatar"
                                :src="member.avatar"
                                :alt="member.name"
                            />
                            <AvatarFallback>
                                {{ getInitials(member.name) }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div class="fw-medium">
                                {{ member.name }}
                            </div>
                            <div class="fg-secondary text-sm">
                                {{ member.email }}
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-4">
                        <DropdownMenu
                            v-if="
                                member.role !== 'owner' &&
                                permissions.canUpdateMember
                            "
                            variant="nav-item"
                        >
                            <DropdownMenuTrigger
                                type="button"
                                class="nav-link"
                                align="bottom-end"
                                :caret="false"
                            >
                                <Button
                                    data-test="member-role-trigger"
                                    variant="outline"
                                    theme="secondary"
                                    size="sm"
                                >
                                    {{ member.role_label }}
                                    <ChevronDown class="icon ms-2 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    v-for="role in availableRoles"
                                    :key="role.value"
                                    data-test="member-role-option"
                                    @click="
                                        updateMemberRole(member, role.value)
                                    "
                                >
                                    {{ role.label }}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Badge v-else theme="secondary">
                            {{ member.role_label }}
                        </Badge>

                        <Tooltip
                            v-if="
                                member.role !== 'owner' &&
                                permissions.canRemoveMember
                            "
                            content="Remove member"
                            placement="left"
                        >
                            <Button
                                data-test="member-remove-button"
                                variant="text"
                                theme="danger"
                                size="icon-sm"
                                @click="confirmRemoveMember(member)"
                            >
                                <X class="icon" />
                            </Button>
                        </Tooltip>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>

        <!-- Pending Invitations Section -->
        <div v-if="invitations.length > 0" class="space-y-5">
            <Heading
                variant="small"
                title="Pending invitations"
                description="Invitations that haven't been accepted yet"
            />

            <ListGroup>
                <ListGroupItem
                    v-for="invitation in invitations"
                    :key="invitation.code"
                    data-test="invitation-row"
                    class="d-flex align-items-center justify-content-between"
                >
                    <div class="d-flex align-items-center gap-4">
                        <Avatar size="sm">
                            <AvatarFallback>
                                <Mail class="icon" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div class="fw-medium">
                                {{ invitation.email }}
                            </div>
                            <div class="fg-secondary text-sm">
                                {{ invitation.role_label }}
                            </div>
                        </div>
                    </div>

                    <Tooltip
                        v-if="permissions.canCancelInvitation"
                        content="Cancel invitation"
                        placement="left"
                    >
                        <Button
                            data-test="invitation-cancel-button"
                            variant="text"
                            theme="danger"
                            size="icon-sm"
                            @click="confirmCancelInvitation(invitation)"
                        >
                            <X class="icon" />
                        </Button>
                    </Tooltip>
                </ListGroupItem>
            </ListGroup>
        </div>

        <!-- Danger Zone -->
        <div
            v-if="permissions.canDeleteTeam && !team.isPersonal"
            class="space-y-5"
        >
            <Heading
                variant="small"
                title="Delete team"
                description="Permanently delete your team"
            />
            <Alert theme="danger">
                <div class="vstack">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription class="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </AlertDescription>

                    <Button
                        data-test="delete-team-button"
                        class="me-auto"
                        theme="danger"
                        @click="deleteDialogOpen = true"
                    >
                        Delete team
                    </Button>
                </div>
            </Alert>
        </div>
    </div>

    <InviteMemberModal
        v-if="permissions.canCreateInvitation"
        :team="team"
        :available-roles="availableRoles"
        :open="inviteDialogOpen"
        @update:open="inviteDialogOpen = $event"
    />

    <RemoveMemberModal
        :team="team"
        :member="memberToRemove"
        :open="removeMemberDialogOpen"
        @update:open="removeMemberDialogOpen = $event"
    />

    <CancelInvitationModal
        :team="team"
        :invitation="invitationToCancel"
        :open="cancelInvitationDialogOpen"
        @update:open="cancelInvitationDialogOpen = $event"
    />

    <DeleteTeamModal
        v-if="permissions.canDeleteTeam && !team.isPersonal"
        :team="team"
        :open="deleteDialogOpen"
        @update:open="deleteDialogOpen = $event"
    />
</template>
