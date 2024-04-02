<script lang="ts" setup>
defineProps(['button', 'photo'])
</script>

<template lang="pug">
section#member-cta.container-fluid.px-0
	.nested.d-flex.justify-content-center.align-items-center
		div
			PhotoWrapper(:photo="photo")
			.button 
				button {{ button }}
</template>

<style lang="scss">
#member-cta {
	padding-bottom: a.$padding;

	.nested {
		// border-radius: a.$border-radius;
		aspect-ratio: 1;
		position: relative;
		overflow: hidden;

			.button {
				@include a.secondary-button;
				
				button {
					background-color: a.color(white);
					color: a.color(black);
				}
			}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#member-cta {
		.nested {
			aspect-ratio: auto;
			height: 100vh;
		}
	}
}
</style>