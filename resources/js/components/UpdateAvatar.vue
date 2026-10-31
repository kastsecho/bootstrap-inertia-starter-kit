<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/ui/input';
import { getInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { destroy } from '@/routes/profile-photo';

const props = defineProps<{
    user: User;
    disabled?: boolean;
}>();

const photoPreview = ref<string | null>(null);
const photoSrc = computed(() => photoPreview.value || props.user.avatar);
const photoInput = ref<InstanceType<typeof ImageInput> | null>(null);

const selectNewPhoto = () => {
    photoInput.value?.click();
};

const updatePhotoPreview = (payload: { src: string; file: File } | null) => {
    photoPreview.value = payload?.src ?? null;
};

const deletePhoto = () => {
    updatePhotoPreview(null);
    photoInput.value?.reset();

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
        ref="photoInput"
        id="photo"
        name="photo"
        hidden
        @loaded="updatePhotoPreview"
    />
    <Avatar :key="photoSrc" size="xl">
        <AvatarImage v-if="photoSrc" :src="photoSrc" :alt="user.name" />
        <AvatarFallback>
            {{ getInitials(user?.name) }}
        </AvatarFallback>
    </Avatar>

    <Button
        type="button"
        variant="outline"
        theme="secondary"
        @click="selectNewPhoto"
        :tabindex="1"
        :disabled="disabled"
        data-test="update-profile-photo-button"
    >
        <template v-if="user.avatar">Change Photo</template>
        <template v-else>Upload Photo</template>
    </Button>

    <Button
        v-if="photoSrc"
        type="button"
        variant="outline"
        theme="danger"
        @click="deletePhoto"
        :tabindex="2"
        :disabled="disabled"
        data-test="remove-profile-photo-button"
    >
        Remove Photo
    </Button>
</template>
