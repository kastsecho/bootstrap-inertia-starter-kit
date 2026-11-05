<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { store as storeInvitation } from '@/routes/teams/invitations';
import type { RoleOption, Team } from '@/types';

type Props = {
    team: Team;
    availableRoles: RoleOption[];
    open: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const inviteRole = ref('member');
const formKey = ref(0);

function handleOpenChange(value: boolean) {
    emit('update:open', value);

    if (!value) {
        inviteRole.value = 'member';
        formKey.value++;
    }
}
</script>

<template>
    <Dialog :open="props.open" @update:open="handleOpenChange">
        <Form
            :key="formKey"
            v-bind="storeInvitation.form(props.team.slug)"
            v-slot="{ errors, processing }"
            @success="emit('update:open', false)"
        >
            <DialogHeader class="vstack space-y-3">
                <DialogTitle>Invite a team member</DialogTitle>
                <DialogDescription class="mb-0">
                    Send an invitation to join this team.
                </DialogDescription>
            </DialogHeader>

            <DialogContent>
                <div class="d-grid gap-5">
                    <div class="d-grid form-field">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            data-test="invite-email"
                            type="email"
                            placeholder="colleague@example.com"
                            required
                            :invalid="!!errors.email"
                        />
                        <InputError :message="errors.email" />
                    </div>

                    <div class="d-grid form-field">
                        <Label for="role">Role</Label>
                        <Select
                            v-model="inviteRole"
                            id="role"
                            name="role"
                            data-test="invite-role"
                        >
                            <SelectTrigger :invalid="!!errors.role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="role in props.availableRoles"
                                    :key="role.value"
                                    :value="role.value"
                                >
                                    {{ role.label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError :message="errors.role" />
                    </div>
                </div>
            </DialogContent>

            <DialogFooter class="gap-4">
                <DialogClose as-child>
                    <Button type="button" variant="subtle">Cancel</Button>
                </DialogClose>

                <Button
                    type="submit"
                    data-test="invite-submit"
                    :disabled="processing"
                >
                    Send invitation
                </Button>
            </DialogFooter>
        </Form>
    </Dialog>
</template>
