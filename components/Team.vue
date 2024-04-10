<script setup lang="ts">
defineProps(['data'])
</script>

<template lang="pug">
section#team
	UiHeading(title="Meet the Team" align="center")
	.container
		.row
			.col-md-6(v-for="item in data?.team" :class="$device.isMobile ? 'px-0' : ''")
				.member
					.name 
						NuxtLink(:to="item?.member.name.url") {{ item?.member.name.title }}
					.position {{ item?.member.position }}
</template>

<style lang="scss" scoped>
#team {
	padding-top: a.$padding;
	padding-bottom: a.$padding;

	.member {
		border: 2px solid #ededed;
		padding: 2rem;
		margin-bottom: 1rem;

		.name {
			font-weight: 500;
		}

		.position {
			color: #00000070;
			font-size: a.$twelve;
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#team {
		padding-top: a.$padding-full;
		padding-bottom: a.$padding-full;
	}
}
</style>