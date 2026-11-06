<script setup lang="ts">
import { Form, Head, setLayoutProps, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import DeleteUser from '@/components/DeleteUser.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/profile';

setLayoutProps({
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
});

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <Head title="Profile settings" />

    <h1 class="visually-hidden">Profile settings</h1>

    <div class="d-flex flex-column space-y-5">
        <Heading
            variant="small"
            title="Profile"
            description="Update your name and email address"
        />

        <Form
            v-bind="update.form()"
            class="space-y-5"
            v-slot="{ errors, processing }"
        >
            <div class="d-grid form-field">
                <Label for="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    :default-value="user.name"
                    required
                    autocomplete="name"
                    placeholder="Full name"
                    :invalid="!!errors.name"
                />
                <InputError :message="errors.name" />
            </div>

            <div class="d-grid form-field">
                <Label for="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    :default-value="user.email"
                    required
                    autocomplete="username"
                    placeholder="Email address"
                    :invalid="!!errors.email"
                />
                <InputError :message="errors.email" />
            </div>

            <div class="d-flex items-center gap-5">
                <Button
                    type="submit"
                    :disabled="processing"
                    data-test="update-profile-button"
                >
                    Save
                </Button>
            </div>
        </Form>

        <DeleteUser />
    </div>
</template>
