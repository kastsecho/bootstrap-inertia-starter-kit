<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/ui/input';
import { getInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { destroy } from '@/routes/profile-avatar';

const props = defineProps<{
    user: User;
    disabled?: boolean;
}>();

const avatarPreview = ref<string | null>(null);
const avatarSrc = computed(() => avatarPreview.value || props.user.avatar);
const avatarInput = ref<InstanceType<typeof ImageInput> | null>(null);

const selectNewAvatar = () => {
    avatarInput.value?.click();
};

const updateAvatarPreview = (payload: { src: string; file: File } | null) => {
    avatarPreview.value = payload?.src ?? null;
};

const deleteAvatar = () => {
    updateAvatarPreview(null);
    avatarInput.value?.reset();

    if (!props.user.avatar) {
        return;
    }

    router.delete(destroy(), {
        preserveScroll: true,
    });
};
</script>

<template>
    <ImageInput
        ref="avatarInput"
        id="avatar"
        name="avatar"
        hidden
        @loaded="updateAvatarPreview"
    />
    <Avatar :key="avatarSrc" size="xl">
        <AvatarImage v-if="avatarSrc" :src="avatarSrc" :alt="user.name" />
        <AvatarFallback>
            {{ getInitials(user?.name) }}
        </AvatarFallback>
    </Avatar>

    <Button
        type="button"
        variant="outline"
        theme="secondary"
        @click="selectNewAvatar"
        :tabindex="1"
        :disabled="disabled"
        data-test="update-profile-avatar-button"
    >
        <template v-if="user.avatar">Change Avatar</template>
        <template v-else>Upload Avatar</template>
    </Button>

    <Button
        v-if="avatarSrc"
        type="button"
        variant="outline"
        theme="danger"
        @click="deleteAvatar"
        :tabindex="2"
        :disabled="disabled"
        data-test="remove-profile-avatar-button"
    >
        Remove Avatar
    </Button>
</template>
