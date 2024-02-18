<template lang="pug">
div
	Hero(v-if="data && $route.params.parentSlug !== 'featured'" :photo="data?.featuredImage?.node?.sourceUrl")
	FeaturedJumbo(v-else-if="$route.params.parentSlug === 'featured'" :photo="data?.featuredImage?.node?.sourceUrl" :title="data?.title" :category="data?.categories?.nodes" :date="data?.date")
	Hero(v-else photo="/login.jpg")
	ContentBody(v-if="data" :title="data?.title")
		div(v-html="data?.content")
	ContentBody(v-else title="Culture")
		div Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vitae possimus aspernatur enim hic praesentium rerum sit nostrum laudantium delectus nesciunt dolor eius, iusto laborum ducimus quam facilis et doloribus nisi, dolorum expedita ipsum aut aperiam modi? Voluptates, dicta praesentium. Nisi esse officia in labore quisquam quae a? Eaque repudiandae quam in modi officiis dolores natus nobis et? Beatae veritatis iste minus error totam voluptate perspiciatis? Consequuntur voluptatem perferendis rem, pariatur obcaecati aliquam! Enim eaque possimus aperiam quam perferendis totam id nisi tempore corrupti odit quis magnam, ducimus natus fugiat optio officia repellat voluptate, soluta quos adipisci modi! Dolore, nisi iure? Dignissimos, et alias enim tenetur consectetur amet quas molestiae vero pariatur sit modi labore aut aperiam praesentium necessitatibus dolorem facere exercitationem reprehenderit quis voluptatum placeat qui. Sequi, architecto. Nesciunt consequuntur earum veniam hic placeat, itaque quidem enim odio animi modi, ratione magni in rem inventore? Quisquam aut officiis voluptas?
</template>

<script lang="ts" setup>
defineProps(['data'])
</script>