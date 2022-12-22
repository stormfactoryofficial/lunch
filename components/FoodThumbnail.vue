<script setup>
const props = defineProps({
	imgSrc: {
		type: String,
		required: true,
	},
	width: {
		type: Number,
	},
	height: {
		type: Number
	}
});
</script>

<template>
	<div :style="`width: ${width}px; height: ${height}px; margin:auto;`">
		<img :src="imgSrc" />
	</div>
</template>

<style>
img {
	width: 100%;
}
</style>
