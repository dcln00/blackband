<template lang="pug">
section#newsletter.container 
	.nested.d-flex.justify-content-center.align-items-center
		div
			PhotoWrapper(photo="/newsletter.jpg")
			Heading(title="subscribe to our newsletter" description="Sign up with your email address to receive news and updates" show-description align="center")
			form(method="post")
				div
					input(type="email" name="email" required placeholder="Email")
				div
					button(type="submit") subscribe
</template>