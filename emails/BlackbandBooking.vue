<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
	name: String,
	checkin: String,
	checkout: String,
	guests: Number,
})

function getYear() {
	return new Date().getFullYear()
}

const main = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
	backgroundColor: '#ffffff',
	padding: '1rem',
}

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px',
}

const footer = {
	textAlign: 'center',
	fontSize: '12px',
	color: 'gray',
}

const links = {
	color: 'black',
	textDecoration: 'underline'
}
</script>

<template>
<EHtml>
	<EHead />
	<EPreview>You have added a new booking</EPreview>
	<EBody :style="main">
		<EContainer :style="container">
			<ESection :style="logo">
				<EImg width="60" height="60" src="/logo.png" alt="logo" />
			</ESection>
			<EHr />
			<ESection>
				<e-heading as="h3">You have added a new booking: {{ name }}</e-heading>
			</ESection>
			<ESection>
				<EText>Details of your booking:</EText>
				<ERow>
					<EText><b>Name:</b> {{ name }}</EText>
					<EText><b>Check-in Date:</b> {{ checkin }}</EText>
					<EText><b>Checkout Date:</b> {{ checkout }}</EText>
					<EText><b>Number of Guests:</b> {{ guests }}</EText>
				</ERow>
			</ESection>
			<EHr />
			<ESection :style="footer">
				<EText :style="{fontSize: '12px'}">For any questions about your booking, contact <ELink href="mailto:support@blackband.co" :style="links">support@blackband.co</ELink></EText>
				<EText :style="{fontSize: '10px'}">© {{ getYear() }} BlackBand, All Rights Reserved</EText>
			</ESection>
		</EContainer>
	</EBody>
</EHtml>
</template>
