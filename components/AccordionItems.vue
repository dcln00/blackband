<template lang="pug">
.col-md-6
	.accordion-header.d-flex(@click="handleShow")
		.accordion-title {{ title }}
		.accordion-icon.ms-auto
			Icon(name="ph:caret-up-bold" v-if="selected === id ? show : false")
			Icon(name="ph:caret-down-bold" v-else)
	.accordion-body(v-if="selected === id ? show : false")
		.accordion-links
			ul
				slot
</template>

<script lang="ts" setup>

defineProps(['title', 'handleShow', 'show', 'selected', 'id'])
</script>