<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
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
import { destroy } from '@/routes/teams';
import type { Team } from '@/types';

type Props = {
    team: Team;
    open: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const confirmationName = ref('');
const formKey = ref(0);

const canDeleteTeam = computed(() => {
    return confirmationName.value === props.team.name;
});

const handleOpenChange = (nextOpen: boolean) => {
    emit('update:open', nextOpen);

    if (!nextOpen) {
        confirmationName.value = '';
        formKey.value++;
    }
};
</script>

<template>
    <Dialog :open="props.open" @update:open="handleOpenChange">
        <Form
            :key="formKey"
            v-bind="destroy.form(props.team.slug)"
            v-slot="{ errors, processing }"
            @success="handleOpenChange(false)"
        >
            <DialogHeader class="vstack space-y-3">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription class="mb-0">
                    This action cannot be undone. This will permanently delete
                    the team
                    <strong class="fg-emphasis-secondary">
                        "{{ props.team.name }}"
                    </strong>
                    .
                </DialogDescription>
            </DialogHeader>

            <DialogContent>
                <div class="space-y-5">
                    <div class="d-grid form-field">
                        <Label for="confirmation-name">
                            Type
                            <strong class="fg-secondary">
                                "{{ props.team.name }}"
                            </strong>
                            to confirm
                        </Label>
                        <Input
                            id="confirmation-name"
                            type="text"
                            name="name"
                            v-model="confirmationName"
                            autocomplete="off"
                            placeholder="Enter team name"
                            :invalid="!!errors.name"
                            data-test="delete-team-name"
                        />
                        <InputError :message="errors.name" />
                    </div>
                </div>
            </DialogContent>

            <DialogFooter class="gap-4">
                <DialogClose as-child>
                    <Button type="button" variant="subtle">Cancel</Button>
                </DialogClose>

                <Button
                    theme="danger"
                    type="submit"
                    :disabled="!canDeleteTeam || processing"
                    data-test="delete-team-confirm"
                >
                    Delete team
                </Button>
            </DialogFooter>
        </Form>
    </Dialog>
</template>
