<script setup>
const { x, y } = useWindowScroll()

const props = defineProps(['show', 'subnav', 'selected'])

const isScrolled = computed(() => y.value >= 0 && y.value < 120)

const pages = computed(() =>
	route.path === '/' || route.params.parentSlug === 'featured' ? true : false
)

function closeDropdown() {
	props.show = false
	props.selected = null
}
</script>

<template lang="pug">
section#dropdown.container-fluid(v-if="show" :style="!(isScrolled) && {top: '108.783px', backgroundColor: '#dbdbdb'}")
	.container
		.row 
			div(v-for="(item, index) in subnav" :class="`col-md-${subnav.length === 3 ? 4 : subnav.length === 2 ? 6 : null}`")
				NuxtLink(:to="item.url")
					.box.d-flex.justify-content-center.align-items-center(@click="show = false")
						.title.pb-0 {{ item.title }}
</template>

<style lang="scss">
#dropdown {
	position: absolute;
	left: 0;
	top: 129.783px;
	z-index: 2;
	transition: .5s;
	
	padding: {
		top: a.$padding-quart;
		bottom: a.$padding-quart;
	}
	background-color: #dbdbdb50;

	a {
		display: block;
		position: static;
		padding-bottom: 0;

		&::after {
			content: '';
			position: static;
		}

		&:hover::after {
			transform: none;
		}
	}

	.box {
		background-color: #ffffff;
		height: 3.5rem;

		.title {
			font-size: a.$twelve;
		}
	}

}
</style>