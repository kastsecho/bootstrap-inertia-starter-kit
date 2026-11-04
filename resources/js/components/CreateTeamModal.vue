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
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/teams';

const open = ref(false);
const formKey = ref(0);

function handleOpenChange(value: boolean) {
    open.value = value;

    if (!value) {
        formKey.value++;
    }
}
</script>

<template>
    <DialogTrigger as-child @click="handleOpenChange(true)">
        <slot />
    </DialogTrigger>

    <Dialog :open="open" @update:open="handleOpenChange">
        <Form
            :key="formKey"
            v-bind="store.form()"
            v-slot="{ errors, processing }"
            @success="open = false"
        >
            <DialogHeader class="vstack space-y-3">
                <DialogTitle>Create a new team</DialogTitle>
                <DialogDescription class="mb-0">
                    Create a new team to collaborate with others.
                </DialogDescription>
            </DialogHeader>

            <DialogContent>
                <div class="d-grid form-field">
                    <Label for="name">Team name</Label>
                    <Input
                        id="name"
                        name="name"
                        data-test="create-team-name"
                        placeholder="My team"
                        required
                        :invalid="!!errors.name"
                    />
                    <InputError :message="errors.name" />
                </div>
            </DialogContent>

            <DialogFooter>
                <DialogClose as-child>
                    <Button type="button" variant="subtle">Cancel</Button>
                </DialogClose>

                <Button
                    type="submit"
                    theme="inverse"
                    :disabled="processing"
                    data-test="create-team-submit"
                >
                    Create team
                </Button>
            </DialogFooter>
        </Form>
    </Dialog>
</template>
