<script setup>
const props = defineProps({
	title: {
		type: String,
		default: '',
		required: true
	}
});
</script>

<template>
	<hgroup>
		<h1 class="text-gothic-bold">{{ title }}</h1>
	</hgroup>
</template>

<style scoped>
hgroup {
	text-align: center;
	margin-block: 20px;
}
</style>
