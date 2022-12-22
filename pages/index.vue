<script setup>
const address = ref({
	road: '',
	buildingName: ''
});

const isAddrWindow = ref(false);

const findAddress = () => {
	const addrEl = document.getElementById('addr-el');

	new daum.Postcode({
		oncomplete: (data) => {
			address.value.road = data.roadAddress;
			if ( !!data.buildingName ) {
				address.value.buildingName = data.buildingName;
			}
			loc.addrToGeo(address.value.road);
			isAddrWindow.value = false;
		},
		width: '100%',
	}).embed(addrEl);

	isAddrWindow.value = true;
}

const geo = ref({
	lat: 37.4745063,
	lng: 126.8897151
});

const isCorrectAddr = ref(true);

const getKey = () => {
	const config = useRuntimeConfig();
	return config.public.GOOGLE_API_KEY;
}

const objToQueryStr = (obj) => {
	return Object.keys(obj).map((key) => {
		return key + '=' + obj[key];
	}).join('&');
}

const loc = {
	callGoogleApi: async (queryStr) => {
		const url = "https://maps.googleapis.com/maps/api/geocode/json" 
		const { data, pending, error, refresh } = await useFetch(
			`${url}?key=${getKey()}&${queryStr}`
		);
		if (error._value) throw new Error(error._value);
		return data;
	},
	addrToGeo: async (roadAddr) => {
		const data = await loc.callGoogleApi(`address=${roadAddr}`);
		const lat = data._value.results[0].geometry.location.lat;
		const lng = data._value.results[0].geometry.location.lng;

		geo.value = { lat, lng }
	},
	reverse: async (lat, lng) => {
		const params = {
			latlng: `${lat},${lng}`,
			location_type: 'ROOFTOP',
		}

		const data = await loc.callGoogleApi(objToQueryStr(params));
		const roadAddr = data._value.results[0].formatted_address.split(" ").slice(1,6).join(" ");
		address.value.road = roadAddr;
	},
	getGeoFromNavigator: () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			loc.reverse(lat, lng);
			geo.value = { lat, lng };
			isCorrectAddr.value = true;
		});
	},
}

onMounted( () => {
	if ('geolocation' in navigator) {
		loc.getGeoFromNavigator();
	} 
})

</script>


<template>
	<aside class="container" v-show="isAddrWindow">
		<CloseButton
			@click.prevent="isAddrWindow = flase"
			@touchend.prevent="isAddrWindow = flase"
			style="color: #333; top: 20px; right: 20px;"
		/>
		<div id="addr-el"></div>
	</aside>

	<div class="container">
		<Header title="점심 메뉴 추천" />
		<main>
			<div class="location-search">
				<input
					type="text"
					placeholder="직장 위치를 알려주시면 점심메뉴를 추천드려요."
					:value="address.road"
					@touchend="findAddress()"
					@click="findAddress()"
				/>
				<div v-if="isCorrectAddr" class="ballon">
					<span>위 주소가 맞나요?</span>
				</div>
			</div>

			<GoogleMap
				:geo="geo"
				style="width: 100%; height: 300px; margin-bottom: 20px;"
			/>

			<Transition name="slide-fade">
				<div v-show="address.buildingName || address.road" class="router-button-wrap">
					<NuxtLink
						:to="{ path: '/selectLunch', query: geo  }"
						class="button bg-purple"
						style="padding: 15px;"
						role="button"
					>
						{{ address.buildingName }} 근처 맛집 추천받기
					</NuxtLink>
				</div>
			</Transition>
		</main>
	</div>
</template>

<style scoped>
aside {
	position: relative;
	z-index: 2;
	overflow: hidden;
	-webkit-overflow-scrolling: touch;
	height: 100vh;
	background: #eee;
	display: flex;
	align-items: center;
}

#addr-el {
	width: 95%;
	margin: auto;
}

.container {
	padding: 10px;
}

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
	transform: translateY(10px);
	opacity: 0;
}

.location-search {
	margin-bottom: 20px;
	position: relative;
}
	
.location-search input {
	width: 100%;
	padding: 10px 5px;
	text-align: center;
	border-radius: var(--border-radius);
	border: 1px solid #ddd;
}

.ballon {
	position: absolute;
	left: 30px;
	background: #484848;
	color: #ffffff;
  border-radius: 5px;
	padding: 5px 10px;
	display: flex;
	align-items: center;
	font-size: 14px;
	z-index: 1;
}

.ballon:after {
	content: "";
	position: absolute;
	top: -10px;
	left: 5px;
	width: 0px;
	height: 0px;
	border-bottom: 10px solid #484848;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
}
</style>
