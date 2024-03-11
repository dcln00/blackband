<script setup lang="ts">
const mail = useMail()

const input = reactive({
	name: '',
	email: '',
	subject: '',
	message: '',
})

const handleSubmit = () => {
	try {
		if (!input.name || !input.email || !input.subject || !input.message) return

		mail.send({
			from: input.email,
			subject: input.subject,
			text: `from ${input.name}

${input.message}`,
		})

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
	UiHeading(title="Contact us" show-description :description="`Thank you for your interest in BlackBand. <br><br> We are continuously striving to improve the BlackBand experience, and feedback is always appreciated. Please let us know if you had any problems, or have any thoughts or suggestions you'd like to share with the team. Thanks.`" align="center")
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
	padding-top: a.$padding;

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
</style>
