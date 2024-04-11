import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const config = useRuntimeConfig(event)

	const template = await useCompiler('blackband-booking.vue', {
		props: {
		  name: body.name,
		  checkin: body.checkin,
		  checkout: body.checkout,
		  guests: body.guests
		}
	  })

	const transporter = nodemailer.createTransport({
		host: config.mailHost,
		port: 587,
		auth: {
			user: config.mailUser,
			pass: config.mailPass,
		},
	})

	await transporter.sendMail({
		from: `BlackBand <${config.mailUser}>`,
		bcc: config.mailUser,
		to: body.to,
		subject: body.subject,
		html: template.html,
	})

	return { message: 'Email sent' }
})