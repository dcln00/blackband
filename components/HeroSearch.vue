<script lang="ts" setup>
const route = useRoute()
const searchQuery = ref('')

const updateSearch = () => {
	const url = new URL(window.location.href)
	url.searchParams.set('search', searchQuery.value)
	window.history.pushState({}, '', url.toString())
}

const filters = [
	{
		icon: 'mdi:umbrella-beach-outline',
		label: 'Tropical'
	},
	{
		icon: 'material-symbols:houseboat-outline-rounded',
		label: 'Lakes'
	},
	{
		icon: 'lucide:palmtree',
		label: 'Beachview'
	},
	{
		icon: 'mingcute:surfboard-line',
		label: 'Surfing'
	},
	{
		icon: 'ri:fire-line',
		label: 'Trending'
	},
]
</script>

<template lang="pug">
section#herosearch(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
	.nested
		PhotoWrapper(photo="/search.jpg")
		UiHeading(title="This is blackband" show-description description="Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence." align="center")
		.input-group
			span.input-group-text
				Icon(name="material-symbols:search")
			input(v-model='searchQuery' @input="updateSearch" type='text' aria-label='Amount (to the nearest dollar)' placeholder='Destination')
			span.input-group-text
				Icon(name="ic:outline-settings-input-component")
		.filters.d-flex.justify-content-around.align-items-center
			.box.d-flex.flex-column.align-items-center(v-for="item in filters" key="item.label")
				Icon(:name="item.icon" size="1.5em")
				.label {{ item.label }}
</template>

<style lang="scss" scoped>
#herosearch {
	padding-top: a.$padding;
	padding-bottom: a.$padding;

	.nested {
		padding: 4rem;
		padding-left: 2rem;
		padding-right: 2rem;
		// background-color: a.color(black);
		border-radius: a.$border-radius;
		position: relative;
		overflow: hidden;


		:deep(.title) {
			color: a.color(white);
		}

		:deep(.description) {
			color: a.color(white);
		}

		.input-group {
			margin-bottom: 1.5rem;

			.input-group-text {
				background-color: white;
				border: none;
			}

			input {
				border: none;
				padding: .6rem;
				position: relative;
				flex: 1 1 auto;
				width: 1%;
				min-width: 0;

				&[placeholder] {
					font-size: .8rem;
				}
			}
		}

		.filters {
			background-color: a.color(white);
			border-radius: 5px;
			padding: .5rem;

			.box {
				.label {
					font-size: .8rem;
					opacity: .5;
				}
			}
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {

#herosearch {
	padding-top: 0;

	.nested {
		padding-top: 10rem;
		padding-bottom: 10rem;
		border-radius: 0;
	}
}
}
</style>