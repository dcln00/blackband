<template lang="pug">
.heading(:style="{textAlign: align}")
	.title {{ title }}
	.description(v-if="showDescription" v-html="description")
	NuxtLink(:to='url')
		button(v-if="showButton" @click="click") {{ buttonText }}
</template>

<script lang="ts" setup>
defineProps({
	title: String,
	description: String,
	align: String,
	showButton: {
		type: Boolean,
		default: false
	},
	showDescription: {
		type: Boolean,
		default: false
	},
	buttonText: String,
	click: Function,
	url: String
})
</script>
