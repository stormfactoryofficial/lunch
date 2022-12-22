<script setup>
const props = defineProps({
	foodList: {
		type: Array,
		required: true
	}
});

const emit = defineEmits(['pick']);

const getSrc = (name) => {
	const url = new URL(`../assets/images/${name}.png`, import.meta.url);
	return url.href;
}

</script>

<template>	
	<ul role="list" class="foods-list">
		<li v-for="row in foodList" :key="row.value">
			<a @click.prevent="emit('pick', row)" href="#" role="button">
				<div class="food-wrap">
					<FoodThumbnail
						:imgSrc="getSrc(row.name)"
						:width="80"
						:height="60"
					/>
					<span class="food-name text-gothic-bold">{{ row.name }}</span>
				</div>
			</a>
		</li>
	</ul>
</template>

<style scoped>
.foods-list {
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
}

.food-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.food-name {
	color: #333;
	font-size: 14px;
	margin-top: 5px;
	margin-bottom: 10px;
}
</style>
