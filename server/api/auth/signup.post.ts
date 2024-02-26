import { PrismaClient } from '@prisma/client'

import { H3Event } from 'h3'

// @ts-expect-error
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
	try {
		const { username, email, password } = await readBody(event)

		if (!email || !username || !password) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Missing Info',
			})
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = await prisma.user.create({
			data: {
				email,
				hashedPassword,
				username,
			},
		})

		return user
	} catch (e) {}
})
