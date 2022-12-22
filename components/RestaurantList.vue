<script setup>
import axios from 'axios';

const props = defineProps({
	coordinates: {
		type: Array,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

watch( () => props.type, () => {
	if ( selectedIndex.value !== null ) selectedIndex.value = null;
	getList()
});

const emit = defineEmits(['marker', 'getmenu', 'opentype']);

const selectedIndex = ref(null);

const selectRestaurant = (row, index) => {
	selectedIndex.value = index;

	const marker = {
		lat: row.location.coordinates[1],
		lng: row.location.coordinates[0],
		title: row.bplcnm
	}

	emit('marker', marker);
}

const selectedDistance = ref({ name: '500m', value: 500 });
const selectDistance = (obj) => {
	selectedDistance.value = obj;
	getList();
}

const list = ref([]);
const total = computed( () => list.value.length );

const getHref = (roadAddr, restaurantName) => {
	const param = (roadAddr.trim() + ' ' + restaurantName).split(" ").join("+");
	return `https://www.google.co.kr/maps/search/${param}`;
}

const getList = async () => {
	const url = 'https://weekly.stormfactory.co.kr/mad/mongo/aggregate/restaurant';

	const query = [
		{
			$geoNear: {
				near: { type: "Point", coordinates: [ props.coordinates[0], props.coordinates[1] ] },
				distanceField: "dist.calculated",
				maxDistance: selectedDistance.value.value,
				query: { uptaenm: props.type },
				uncludeLocs: "dist.location",
				spherical: true
			}
		}
	];

	try {		
		const res = await axios.get( url , {
			params: { query: JSON.stringify(query) }
		});
		
		if ( typeof res.data !== 'string' ) list.value = res.data;
	} catch (error) {
		alert('정보를 가져오는 중 문제가 발생했습니다.');
		throw new Error(error);
	}	
}

onMounted ( () => getList() );
</script>

<template>
	<div>
		<section class="top-bar">
			<span>
				총 {{ total }}건<span class="seperator">|</span>거리순
			</span>
			<DistanceSelector
				@select="selectDistance"
				:selected="selectedDistance"
			/>
		</section>

		<section>
			<ul role="list" class="grid-list">
				<li
					v-for="(row, index) in list"
					:key="row._id.$oid"
					:class="{ active : index === selectedIndex }"
				>
					<div
						class="d-flex flex-column"
						@touchend="selectRestaurant(row, index)"
						@click="selectRestaurant(row, index)"	
					>
						<span class="ommit">{{ row.bplcnm }}</span>
						<span class="small muted">{{ Math.ceil(row.dist.calculated)}}m</span>
						<a
							@click.stop.prevent
							@touchstart.stop.prevent
							:href="getHref(row.rdnwhladdr, row.bplcnm)"
							target="_blank"	
							role="button"
							style="width: 60px;"
						>
							more >
						</a>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<style scoped>
.top-bar {
	font-size: 14px;
	width: 100%;
	margin-block: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.seperator {
	margin-inline: 5px;
}

.grid-list {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 50px;
}

.grid-list li {
 border: 1px solid #ddd;
 padding: 10px;
 border-radius: 5px;
}

.active {
	border: 1px solid #ea4335 !important;
}

.ommit {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
	width: 148px;
}
</style>
