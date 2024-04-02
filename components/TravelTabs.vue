<script lang="ts" setup>
defineEmits(['show-modal'])
defineProps(['data'])
</script>

<template lang="pug">
section#travel-tabs
	TabView
		TabPanel(
			v-for="(item, index) in data" 
			:key="item.title" 
			:header="item.title"
			headerClass="tab-nav"
			)
			div(v-html="item.writeUp")

			.blackband-buttons(v-if="index === 0" @click="$emit('showModal')")
				button {{ item.button.title }}

			.blackband-buttons(v-if="index === 1")
				NuxtLink(href="/destinations")
					button {{ item.button.title }}
</template>

<style lang="scss" scoped>
#travel-tabs {
	padding-top: a.$padding;
	padding-bottom: a.$padding;
}

:deep(.p-tabview-panel) {
	font-family: a.$body-font;
	font-size: a.$twelve;
	line-height: 20px;
}

:deep(.p-tabview-nav) {
	padding-left: 0;
	column-gap: 20px;
	border-bottom: 0;
	padding-bottom: .8rem;
}

:deep(.p-tabview-header) {
	border-bottom: 0;
	font-family: a.$body-font;
	font-size: a.$ten;
	color: a.color(black);
	text-transform: uppercase;
	font-weight: 800;

	.p-tabview-nav-link {
		border: none;
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#travel-tabs {
	padding-top: 5rem;
	padding-bottom: 5rem;
	}

	:deep(.p-tabview-panel) {
		font-size: 1rem;
	}

	:deep(.p-tabview-header) {
		font-size: 1rem;
	}
}
</style>
