<script setup lang="ts">
// const mail = useMail()

const input = reactive({
	name: '',
	email: '',
	subject: '',
	message: '',
})

const handleSubmit = async () => {
	try {
		if (!input.name || !input.email || !input.subject || !input.message) return

		const res = await $fetch('/api/mail/contact', {
			method: 'post',
			body: {
				from: `${input.name} <${input.email}>`,
				subject: input.subject,
				text: `${input.message}`,
			},
		})

		if(!res) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error sending mail',
			})
			
			return
		}

		alert('mail sent!')
	} catch (e) {
		console.log(e)
	} finally {
		input.name = ''
		input.email = ''
		input.subject = ''
		input.message = ''
	}
}
</script>

<template lang="pug">
section#contact.container
	.row 
		.col-sm-4 
			UiHeading(title="Contact us" show-description :description="`Thank you for your interest in BlackBand. <br><br> We are continuously striving to improve the BlackBand experience, and feedback is always appreciated. Please let us know if you had any problems, or have any thoughts or suggestions you'd like to share with the team. Thanks.`" align="center")
		.col-sm-8
			.contact-form.container 
				form(@submit.prevent="handleSubmit")
					.row 
						.col-6
							input(type="text" v-model="input.name" placeholder="Name")
						.col-6
							input(type="email" v-model.trim="input.email" placeholder="Email")
						.col-12
							input(type="text" v-model="input.subject" placeholder="Subject")
						.col-12
							textarea(placeholder="Enter your message here" v-model="input.message")
					.button
						button(type="submit") Send Message
</template>

<style lang="scss" scoped>
#contact {
	padding-top: a.$padding-half;
	padding-bottom: a.$padding;

	.contact-form {
		input,
		textarea {
			padding: 0.6rem;
			width: 100%;
			border: 1px solid a.color(black);
			border-radius: a.$border-radius;
			box-shadow: none;
			margin-bottom: 1rem;

			&[placeholder] {
				font-size: 0.8rem;
			}
		}

		textarea:focus {
			outline: none;
		}

		.button {
			@include a.secondary-button;
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#contact {
		padding-top: 5rem;
	}
}
</style>
