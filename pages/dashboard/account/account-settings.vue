<script setup lang="ts">
const isOpen = ref(false)

const showModal = () => {
	isOpen.value = !isOpen.value
}

const settings = [
	{
		title: 'Change Display name',
	},
]
</script>

<template lang="pug">
section#account-settings
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			.title Change Display Name
			UiDisplayNameForm(@show-modal="showModal" :show-modal="showModal")
	DashTitle(title="Account Settings" show)
	.menu-list
		DashMenu(:menu="settings" :event="showModal")
</template>

<style lang="scss" scoped>
:deep(.menu-list) {
	.title {
		text-transform: capitalize;
		letter-spacing: 0;
	}

	hr {
		display: none;
	}
}
</style>
