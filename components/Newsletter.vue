<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const subscribed = useLocalStorage('subscribed', false)

const validate = {
	email(value: string) {
		if (!value) {
			return 'This field is required'
		}

		const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
		if (!regex.test(value)) {
			return 'This field must be a valid email'
		}

		return true
	},
}

const handleSubscribe = async () => {
	if (!email.value) return

	// @ts-expect-error
	const { error } = await supabase.from('subscriptions').insert({
		email: email.value,
	})

	if (error) {
		console.log(error)
		return
	}

	subscribed.value = true
}
</script>

<template lang="pug">
section#newsletter(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
	.nested.d-flex.justify-content-center.align-items-center
		div.box
			PhotoWrapper(photo="/newsletter.jpg")
			UiHeading(:title="!subscribed ? 'Blackband Stories' : 'Thanks for subscribing!'" description="Be the first to hear , First To See , First To Experience" :show-description="!subscribed" align="center")
			VeeForm(@submit="handleSubscribe" v-if="!subscribed" :validation-schema="validate" v-slot="{ errors }")
				div
					VeeField(type="email" v-model="email" name="email" required placeholder="Email")
					//- div {{ errors.email }}
					ErrorBound(:message="errors.email" v-if="errors.email")
				div
					button(type="submit") subscribe
</template>

<style lang="scss" scoped>
#newsletter {
	padding-bottom: a.$padding-half;

	.nested {
		border-radius: a.$border-radius;
		aspect-ratio: 1;
		position: relative;
		overflow: hidden;

		.box {
			width: 80%;
		}

		.heading {
			color: a.color(white);
		}

		input {
			width: 100%;
			border: none;
			border-radius: a.$border-radius;
			padding: 0.4rem 1rem;
			font-size: 1rem;
			font-weight: 300;
			margin-bottom: 1.2rem;
			outline: none;
		}

		button {
			width: 100%;
			border: none;
			border-radius: a.$border-radius;
			padding: 0.6rem 1rem;
			font-size: a.$twelve;
			font-weight: 300;
			background-color: a.color(black);
			color: a.color(white);
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#newsletter {
		padding-bottom: 0;

		.nested {
			border-radius: 0;
			aspect-ratio: auto;
			padding-top: 10rem;
			padding-bottom: 10rem;

			.box {
				width: 30%;
			}
		}
	}
}
</style>
