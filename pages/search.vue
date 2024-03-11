<script setup lang="ts">
const query = useRoute().query
const nuxtApp = useNuxtApp()

console.log(query)

const search = computed(
	() =>
		`/api/destinations/search?query=${query.query}${
			query.trip ? `&trip=${query.trip}` : ''
		}${query.location ? `&location=${query.location}` : ''}`
)

const { data: list, error } = await useFetch(search, {
	key: 'searchList',
})

console.log(list.value)
</script>

<template lang="pug">
div
	section#search-title.container 
		.title(v-if="list.length") Showing results for '{{ query.query }}'
		.title(v-else) No results for '{{ query.query }}'

	section#search-list.container
		.destination(v-for="item in list" :key="item.title")
			NuxtLink(:to="`/destinations/${item.slug}`")
				.photo
					DashDestWrapper(:photo="item.featuredImage.node.sourceUrl")
					.category {{ item.destinationCategories.nodes[0].name }}
					//- .rating.d-flex.align-items-center
						Icon(name="material-symbols:kid-star-sharp" color='white')
						.num 5.0
			.details
				.box.d-flex.align-items-center
					NuxtLink(:to="`/destinations/${item.slug}`")
						.title {{ item.title }}
					.price.ms-auto ${{ item.acfDestinations.price }}
				.location {{ item.acfDestinations.location || 'Accra, Ghana' }}
</template>

<style lang="scss" scoped>
section#search-list {
	padding-top: a.$padding;
	padding-bottom: 2.5rem;

	.destination {
		padding-bottom: 1.5rem;

		.photo {
			// background-color: pink;
			aspect-ratio: 16/8;
			border-radius: a.$border-radius;
			position: relative;

			.rating {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				column-gap: 5px;
				color: white;
			}

			.category {
				position: absolute;
				bottom: 1rem;
				left: 1rem;
				column-gap: 5px;
				color: white;
				border: 1px solid white;
				padding: 0.1rem 1rem;
				font-size: a.$twelve;
			}
		}
		.details {
			padding-top: 1rem;
			position: relative;

			.box {
				width: 80%;
			}

			.title {
				text-transform: capitalize;
				font-weight: 500;
				letter-spacing: normal;
				padding-bottom: 0;
				font-size: 1rem;
			}

			.price {
				font-size: 1.2rem;
				position: absolute;
				font-weight: 900;
				right: 0;
				top: 1rem;
			}

			.location {
				color: rgb(105, 105, 105);
			}
		}
	}
}
</style>
