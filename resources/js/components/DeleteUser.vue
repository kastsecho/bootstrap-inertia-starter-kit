<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { useTemplateRef } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Label } from '@/components/ui/label';
import { destroy } from '@/routes/profile';

const passwordInput = useTemplateRef('passwordInput');
</script>

<template>
    <div class="space-y-6">
        <Heading
            variant="small"
            title="Delete account"
            description="Delete your account and all of its resources"
        />

        <Alert theme="danger">
            <div class="vstack">
                <AlertTitle class="alert-heading">Warning</AlertTitle>
                <AlertDescription class="text-sm">
                    Please proceed with caution, this cannot be undone.
                </AlertDescription>

                <DialogTrigger
                    class="me-auto"
                    as-child
                    target="#deleteUserDialog"
                >
                    <Button theme="danger" data-test="delete-user-button">
                        Delete account
                    </Button>
                </DialogTrigger>
            </div>
        </Alert>

        <Dialog id="deleteUserDialog">
            <Form
                v-bind="destroy.form()"
                reset-on-success
                @error="() => passwordInput?.focus()"
                :options="{ preserveScroll: true }"
                v-slot="{ errors, processing, resetAndClearErrors }"
            >
                <DialogHeader class="vstack space-y-3">
                    <DialogTitle>
                        Are you sure you want to delete your account?
                    </DialogTitle>
                    <DialogDescription class="mb-0">
                        Once your account is deleted, all of its resources and
                        data will also be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </DialogDescription>
                </DialogHeader>

                <DialogContent>
                    <div class="d-grid form-field">
                        <Label for="password" class="visually-hidden">
                            Password
                        </Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            ref="passwordInput"
                            placeholder="Password"
                            :invalid="!!errors.password"
                        />
                        <InputError :message="errors.password" />
                    </div>
                </DialogContent>

                <DialogFooter class="gap-3">
                    <DialogClose as-child>
                        <Button
                            type="button"
                            variant="subtle"
                            @click="() => resetAndClearErrors()"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        type="submit"
                        theme="danger"
                        :disabled="processing"
                        data-test="confirm-delete-user-button"
                    >
                        Delete account
                    </Button>
                </DialogFooter>
            </Form>
        </Dialog>
    </div>
</template>
