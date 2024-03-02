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
			Heading(:title="!subscribed ? 'subscribe to our newsletter' : 'Thanks for subscribing!'" description="Sign up with your email address to receive news and updates" :show-description="!subscribed" align="center")
			form(@submit.prevent="handleSubscribe" v-if="!subscribed")
				div
					input(type="email" v-model="email" name="email" required placeholder="Email")
				div
					button(type="submit") subscribe
</template>