<script setup lang="ts">
const user = useSupabaseUser()

const fullname = user.value?.user_metadata?.username
</script>

<template lang="pug">
section#dash-profile.container
	.nested.d-flex.align-items-center
		.profile-photo.d-flex.justify-content-center.align-items-center
			.initials {{ initials(fullname) }}
		.details
			.greeting {{ greeting() }}
			.name {{ fullname || 'User' }}
</template>

<style lang="scss">
@use '../../assets/style/abstracts' as a;
#dash-profile {
	.nested {
		
		column-gap: 12px;

		.profile-photo {
			background-color: rgb(0, 0, 0);
			width: 50px;
			height: 50px;
			border-radius: 50px;
			overflow: hidden;
		}

		.initials {
			color: a.color(white);
		}

		.greeting {
			font-size: a.$ten;
		}
	}
}
</style>