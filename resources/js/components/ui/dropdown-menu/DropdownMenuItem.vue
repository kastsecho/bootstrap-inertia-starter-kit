<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { DropdownMenuVariants } from '@/components/ui/dropdown-menu';
import { dropdownMenuVariants } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    active?: boolean;
    disabled?: boolean;
    theme?: DropdownMenuVariants['theme'];
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'a',
});
</script>

<template>
    <Primitive
        data-slot="dropdown-menu-item"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                dropdownMenuVariants({ theme }),
                { active: active, disabled: disabled },
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
