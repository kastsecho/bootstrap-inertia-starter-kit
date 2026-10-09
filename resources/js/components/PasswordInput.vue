<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue';
import { ref, useTemplateRef } from 'vue';
import type { HTMLAttributes } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    invalid?: boolean;
    autofocus?: boolean;
    class?: HTMLAttributes['class'];
}>();

const showPassword = ref(false);
const inputRef = useTemplateRef('inputRef');

defineExpose({
    $el: inputRef,
    focus: () => inputRef.value?.$el?.focus(),
});
</script>

<template>
    <label
        :class="
            cn(
                'form-control form-adorn form-adorn-end',
                { 'is-invalid': invalid },
                props.class,
            )
        "
    >
        <Button
            type="button"
            variant="text"
            theme="secondary"
            size="icon-xs"
            @click="showPassword = !showPassword"
            class="bg-body form-adorn-icon"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :tabindex="-1"
        >
            <EyeOff v-if="showPassword" class="icon" />
            <Eye v-else class="icon" />
        </Button>
        <Input
            v-focus="autofocus"
            ref="inputRef"
            ghost
            :type="showPassword ? 'text' : 'password'"
            :invalid="props.invalid"
            v-bind="$attrs"
        />
    </label>
</template>
