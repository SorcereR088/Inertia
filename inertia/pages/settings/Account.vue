<script setup lang="ts">
import UserDto from '#dtos/user';
import AccountDeleteCard from '~/components/AccountDeleteCard.vue';
import AccountEmailCard from '~/components/AccountEmailCard.vue';
import AppHead from '~/components/AppHead.vue';
import SettingsShell from '~/components/SettingsShell.vue';

defineProps<{user: UserDto}>()

</script>

<template>
    <AppHead title="Account Settings" description="Manage Your Account" />

    <SettingsShell>
        <AccountEmailCard :email="user.email" />
        <AccountDeleteCard :email="user.email" />
    </SettingsShell>
</template>