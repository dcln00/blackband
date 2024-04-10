<script setup lang="ts">
const props = defineProps(['showModal'])
// const mail = useMail()

const input = reactive({
	name: '',
	email: '',
	number: '',
	company: '',
	subject: '',
	message: ''
})

const handleSubmit = () => {
	try {
		if (!input.name || !input.email || !input.number || !input.subject || !input.message) return

// 		mail.send({
// 			from: input.email,
// 			subject: input.subject,
// 			text: `from ${input.name}

// Telephone number: ${input.number} || Company: ${input.company}

// ${input.message}`,
// 		})
		
		alert('mail sent!')

	} catch(e) {
		console.log(e)
	} finally {
		input.name = ''
		input.email = ''
		input.number = ''
		input.company = ''
		input.subject = ''
		input.message = ''

		props.showModal()
	}
}
</script>

<template lang="pug">
form(@submit.prevent="handleSubmit")
	.row 
		.col-6
			input(type="text" v-model="input.name" placeholder="Name")
		.col-6
			input(type="email" v-model.trim="input.email" placeholder="Email")
		.col-6
			input(type="tel" v-model.number="input.number" placeholder="Number")
		.col-6
			input(type="text" v-model="input.company" placeholder="Company")
		.col-12
			input(type="text" v-model="input.subject" placeholder="Subject")
		.col-12
			textarea(placeholder="Enter your message here" v-model="input.message")
	.button
		button(type="submit") Send Message
</template>

<style lang="scss" scoped>
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
</style>
