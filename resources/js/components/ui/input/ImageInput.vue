<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useTemplateRef } from 'vue';
import { cn } from '@/lib/utils';

const emit = defineEmits<{
    loaded: [payload: { src: string; file: File }];
}>();

const props = defineProps<{
    hidden?: boolean;
    class?: HTMLAttributes['class'];
}>();

const fileInput = useTemplateRef('fileInput');

const loadImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);

    if (!file || !file.type.startsWith('image/')) {
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        if (typeof reader.result === 'string') {
            emit('loaded', {
                src: reader.result,
                file: file,
            });
        }
    };

    reader.readAsDataURL(file);
};

const reset = () => {
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

defineExpose({
    $el: fileInput,
    click: () => fileInput.value?.click(),
    reset: () => reset(),
});
</script>

<template>
    <input
        ref="fileInput"
        type="file"
        :class="cn({ 'd-none': hidden }, props.class)"
        accept="image/*"
        @change="loadImage"
    />
</template>
