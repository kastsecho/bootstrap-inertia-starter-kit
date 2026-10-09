<script setup lang="ts">
import { Monitor, Moon, Sun } from '@lucide/vue';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', Icon: Sun, label: 'Light' },
    { value: 'dark', Icon: Moon, label: 'Dark' },
    { value: 'system', Icon: Monitor, label: 'System' },
] as const;
</script>

<template>
    <div class="nav nav-pills shadow-sm">
        <NavigationMenuLink
            v-for="{ value, Icon, label } in tabs"
            :key="value"
            class="icon-link"
            as="button"
            @click="updateAppearance(value)"
            :active="appearance === value"
        >
            <component :is="Icon" class="icon-sm" />
            <span class="text-sm">{{ label }}</span>
        </NavigationMenuLink>
    </div>
</template>
