<script setup>
const foodList = [
	{ value: '한식', name: '한식' },
	{ value: '분식', name: '분식' },
	{ value: '중국식', name: '중식' },
	{ value: '일식', name: '일식' },
	{ value: '김밥(도시락)', name: '김밥&도시락' },
	{ value: '외국음식전문점(인도,태국등)', name: '외국요리' },
	{ value: '경양식', name: '경양식' },
	{ value: '패스트푸드', name: '패스트푸드' },
	{ value: '식육(숯불구이)', name: '구이' },
	{ value: '패밀리레스트랑', name: '패밀리레스토랑' },
]

const load = ref(false);
const isTypeList = ref(false);

const pickType = (typeRow) => {
	recommandFood.value = typeRow;
	isTypeList.value = false;
}

const getRandomNumberRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const recommandFood = ref({
	name: "",
	value: ""
});

const marker = ref({
	lat: 0,
	lng: 0,
	title: '',
});

const setMarker = (value) => marker.value = value;

const setRecommandFood = () => {
	const randomIndex = getRandomNumberRange(0, foodList.length-1);
	recommandFood.value = foodList[randomIndex];
}

const myLocation = ref([]);  // [ lng, lat ]

const foodThumbnail = computed ( () => {
	const url = new URL( `../assets/images/${recommandFood.value.name}.png`, import.meta.url );
	return url.href;
});

onMounted(()=> {
	const route = useRoute();
	myLocation.value = [parseFloat(route.query.lng), parseFloat(route.query.lat)];
	setRecommandFood();
	load.value = true;
});

</script>

<template>
	<div class="container main-wrap">
		<section style="padding: 10px; padding-bottom: 0;">
			<header>
				<hgroup>
					<FoodThumbnail
						:load="load"
						:imgSrc="foodThumbnail"
						:width="120"
						:height="90"
						style="margin-bottom: 10px;"
					/>
					<h1 v-show="load" class="text-gothic-bold">
						오늘, {{ recommandFood?.name }} 어때요?
					</h1>
				</hgroup>
			</header>

			<div v-if="load" style="height: 200px;">
				<GoogleMap
					:geo="{ lat: myLocation[1], lng: myLocation[0] }"
					:marker="marker"
				/>
			</div>
		</section>

		<main class="list-section">
			<RestaurantList
				v-if="load"
				:coordinates="myLocation"
				:type="recommandFood.value"
				style="padding: 10px"
				@marker="setMarker"
			/>
		</main>

		<footer class="container">
			<div class="bottom-button-wrap">
				<a
					class="button bg-white all-menu-button"
					@click.stop.prevent="isTypeList = true"
					href="#" role="button"
				>
					메뉴 전체 보기
				</a>
				<a
					class="button bg-purple"
					@click.stop.prevent="setRecommandFood"
					href="#" role="button"
				>
					다른 메뉴 추천
				</a>
			</div>
		</footer>
		
		<aside v-if="isTypeList">
			<div class="type-list-wrap">
				<tmplCloseButton
					@click.prevent="isTypeList = flase"
					@touchend.prevent="isTypeList = flase"
					style="color: #ffffff; top: -40px; right: 13px;"
				/>
				<PickFoodType :food-list="foodList" @pick="pickType" />
			</div>
		</aside>
	</div>	
</template>

<style scoped>
.main-wrap {
	height: 100vh;
	overflow: hidden;
}

header {
	margin-bottom: 10px;
}

header h1 {
	text-align: center;
	font-size: x-large;
}

footer {
	position: fixed;
	bottom: 10px;
}

.bottom-button-wrap {
	width: 94%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
	margin: auto;
}

.bottom-button-wrap .button {
	padding-block: 10px;
}

.bottom-button-wrap .all-menu-button {
	color: var(--purple-color);
	border: 1px solid var(--purple-color);
}

aside {
	top: 0;
	position: fixed;
	height: 100vh;
	width: 100%;
	max-width: var(--max-width);
	min-width: 300px;
	background: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

aside .type-list-wrap {
	position: relative;
	width: 100%;
	height: fit-content;
	background-color: #ffffff;
	margin-inline: 10px;
	padding-block: 20px;
	border-radius: 10px;
}

.list-section {
	height: calc(100vh - 365px);
	overflow: auto;
}
</style>
