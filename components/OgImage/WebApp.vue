<script setup lang="ts">
withDefaults(
	defineProps<{
		title?: string,
		description?: string
	}>(),
	{
		title: 'title',
		description: 'description',
	}
)
</script>

<template>
	<div class="h-full w-full flex items-start justify-start bg-white">
		<div class="flex items-start justify-start h-full">
			<div class="flex flex-col justify-end w-full h-full">
				<div class="flex items-center gap-y-[20px] p-20 pb-0 pl-10">
					<img src="/logo.png" class="size-[100px]" alt="logo"/>
					<h1 class="text-[60px] text-left">
						{{ title }}
					</h1>
				</div>
				<p class="text-[35px] pb-10 px-17 mb-0">{{ description }}</p>
			</div>
		</div>
	</div>
</template>