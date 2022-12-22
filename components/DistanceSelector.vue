<script setup>
const props = defineProps({
	selected: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['select']);

const isOption = ref(false);
const toggleOption = (e) => isOption.value = !isOption.value;

const option =  [
	{ name: '100m', value: 100 },
	{ name: '300m', value: 300 },
	{ name: '500m', value: 500 }, 
	{ name: '1km', value: 1000 },
	{ name: '3km', value: 3000 } 
];

const selectDistance = (row) => {
	isOption.value = false;
	emit('select', row);
}
</script>

<template>
	<div class="distance-wrap">
		<a
			@touchend.prevent="toggleOption($event)"
			@click.prevent="toggleOption($event)"
			class="distance-button"
			href="#"
			role="button"
		>
			<i class="fal fa-location"></i>
			<span>{{ selected.name }}</span>
		</a>
		<div v-if="isOption" class="distance-option">
			<ul role="list">
				<li v-for="row in option" :key="row.value">
					<a
						@touchend.stop.prevent="selectDistance(row)"
						@click.stop.prevent="selectDistance(row.value)"
						:class="{ active : row.value === selected.value }"
						role="button"
						href="#"
					>
						{{ row.name }}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.distance-wrap {
	position: relative;	
}

.distance-button {
	font-size: 12px;
	padding: 8px 10px;
	border-radius: 20px;
	background-color: #eee;
}

.distance-option {
	position: absolute;
	padding: 10px;
	width: 66px;
	top: 30px;
	border-radius: 10px;
	background-color: #eee;
}

.distance-option ul {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.distance-option li {
 padding-block: 2px;
}

.distance-option li a {
	color: #333;
	font-size: 12px;
}

.distance-option .active {
	color: var(--bs-link-color);
}
</style>
