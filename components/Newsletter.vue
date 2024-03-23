<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const subscribed = useLocalStorage('subscribed', false)

const handleSubscribe = async () => {
	if (!email.value) return

	// @ts-expect-error
	const { error } = await supabase.from('subscriptions').insert({
		email: email.value
	})

	if(error) {
		console.log(error)
		return
	}

	subscribed.value = true
}
</script>

<template lang="pug">
section#newsletter.container 
	.nested.d-flex.justify-content-center.align-items-center
		div
			PhotoWrapper(photo="/newsletter.jpg")
			UiHeading(:title="!subscribed ? 'Travel News' : 'Thanks for subscribing!'" description="Be the first to hear , First To See , First To Experience" :show-description="!subscribed" align="center")
			form(@submit.prevent="handleSubscribe" v-if="!subscribed")
				div
					input(type="email" v-model="email" name="email" required placeholder="Email")
				div
					button(type="submit") subscribe
</template>

<style lang="scss" scoped>
#newsletter {
	padding-bottom: a.$padding;

	.nested {
		border-radius: a.$border-radius;
		aspect-ratio: 1;
		position: relative;
		overflow: hidden;

		.heading {
			color: a.color(white);
		}

		input {
			width: 100%;
			border: none;
			border-radius: a.$border-radius;
			padding: .4rem 1rem;
			font-size: 1rem;
			font-weight: 300;
			margin-bottom: 1.2rem;
			outline: none;
		}

		button {
			width: 100%;
			border: none;
			border-radius: a.$border-radius;
			padding: .6rem 1rem;
			font-size: a.$twelve;
			font-weight: 300;
			background-color: a.color(black);
			color: a.color(white);
		}
	}
}
</style>