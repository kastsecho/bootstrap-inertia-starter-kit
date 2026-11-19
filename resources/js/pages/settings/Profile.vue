<script setup lang="ts">
import { Form, Head, setLayoutProps, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import DeleteUser from '@/components/DeleteUser.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
/* @chisel-email-verification */
import TextLink from '@/components/TextLink.vue';
/* @end-chisel-email-verification */
import UpdateAvatar from '@/components/UpdateAvatar.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { update } from '@/routes/user-profile-information';
/* @chisel-email-verification */
import { send } from '@/routes/verification';
/* @end-chisel-email-verification */

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
                <Label for="avatar">Avatar</Label>
                <div class="d-flex align-items-center gap-5">
                    <UpdateAvatar :user="user" :disabled="processing" />
                </div>
                <InputError
                    :class="{ ['d-block']: errors.avatar }"
                    :message="errors.avatar"
                />
            </div>

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

                <!-- @chisel-email-verification -->
                <template
                    v-if="page.props.mustVerifyEmail && !user.email_verified_at"
                >
                    <p
                        class="form-text d-flex flex-column align-items-start mb-0"
                    >
                        Your email address is unverified.
                        <TextLink
                            :href="send()"
                            as="button"
                            class="btn btn-link btn-sm ps-0"
                        >
                            Click here to re-send the verification email.
                        </TextLink>
                    </p>

                    <div
                        v-if="page.props.status === 'verification-link-sent'"
                        class="form-text fw-medium fg-success form-text"
                    >
                        A new verification link has been sent to your email
                        address.
                    </div>
                </template>
                <!-- @end-chisel-email-verification -->
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
