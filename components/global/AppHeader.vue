<script setup lang="ts">
const store = useAppNavigation()
const { x, y } = useWindowScroll()
const route = useRoute()
const user = useSupabaseUser()
const isShowing = ref(false)
const selected = ref(null)
const dropRef = ref(null)
const query = computed(() => `/api/menu`)

onClickOutside(dropRef, event => {
		isShowing.value = false
		selected.value = null
})

function dropdownOpen(id) {

	if(!isShowing.value) {
		isShowing.value = true
		selected.value = id
	}

}

function dropdownClose() {
	setTimeout(() => {
		isShowing.value = false
		selected.value = null
	}, 500)
}

const isScrolled = computed(() => y.value >= 0 && y.value < 120)

const pages = computed(() =>
	route.path === '/' || route.params.parentSlug === 'featured' || route.params.parentSlug === 'destinations' ? true : false
)

const { data, error } = await useFetch(query.value)

const menu = flatToHeirarchical(data.value)
</script>

<template lang="pug">
header
	.subheader.container-fluid.px-5 
		.nested.d-flex
			.sub-links
				ul.d-flex.align-items-center
					li(v-for="item in store.navigation.cards" :key="item.title")
						NuxtLink(:to='item.url') {{ item.title }}
			.sub-links.ms-auto
				ul.d-flex.align-items-center
					li(v-for="item in store.navigation.secondary.slice(1)" :key="item.title") 
						NuxtLink(:to='item.url') {{ item.title }}

	.mainheader.container-fluid.px-5(:style="(isScrolled && pages) && {backgroundColor: 'transparent', color: 'white', borderBottom: 'none'}")
		.nested.d-flex.justify-content-between.align-items-center(:style="!isScrolled && {padding: '1rem 0'}")
			.logo(:style="(isScrolled && pages) && {filter: 'invert(100%)'}")
				NuxtLink(to="/")
					NuxtImg(src="/logo.svg" width="45" height="45")
			nav
				ul.d-flex.align-items-center
					li(v-for="item in menu" :key="item.title" @click="dropdownOpen(item.key)" ) #[span(ref="dropRef") {{ item.title }}] #[Icon(name="ph:caret-down-bold" size=".8rem")]
						Transition(name='overlay')
							AppDropdown(:show="isShowing" :selected="selected" :subnav="item.children" v-if="selected === item.key")
			.button
				NuxtLink(v-if="user" to='/dashboard/destinations' external)
					button(:style="isScrolled && {backgroundColor: '#00000050', color: 'white'}") Dashboard
				NuxtLink(to="/login" v-else)
					button(:style="isScrolled && {backgroundColor: '#00000050', color: 'white'}") Login
</template>

<style scoped lang="scss">
header {
	position: fixed;
	width: 100%;
	z-index: 10;

	.subheader {
		background-color: a.color(black);

		.nested {
			padding: a.$ten 0;

			.sub-links {
				color: a.color(white);

				ul {
					padding: 0;
					margin: 0;
					column-gap: 20px;

					li {
						list-style-type: none;
						text-transform: uppercase;
						font-size: a.$ten;
						cursor: pointer;

						a {
							color: a.color(white);
						}
					}
				}
			}
		}
	}

	.mainheader {
		// position: fixed;
		background-color: a.color(white);
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
		transition: 0.5s;

		.nested {
			padding-top: a.$padding-quart;
			padding-bottom: a.$padding-quart;
			transition: 0.5s;

			.logo {
				transition: 0.5s;
			}

			.logo,
			.button {
				flex: 1;
			}

			.button {
				text-align: right;
			}

			nav {
				ul {
					column-gap: 20px;
					padding: 0;
					margin-bottom: 0;

					li {
						list-style-type: none;
						text-transform: uppercase;
						font-size: a.$twelve;
						font-weight: 500;
						cursor: pointer;
						display: inline-block;
						// padding-bottom: 1rem;
						
						span {
							padding-right: .5rem;
						}
					}
				}
			}

			button {
				transition: 0.5s;
				text-transform: uppercase;
				font-size: a.$ten;
				padding: 0.6rem 2rem;
				color: a.color(white);
				background-color: a.color(black);
				border: none;
				box-shadow: none;
				font-weight: 400;
				letter-spacing: -0.06em;
			}
		}
	}
}
</style>
