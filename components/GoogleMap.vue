<script setup>
import { Loader } from "@googlemaps/js-api-loader"

const markers = ref([]);
let map;

const props = defineProps({
	geo: {
		type: Object,
		default: {
			lat: 0.0,
			lng: 0.0
		},
		required: true
	},
	marker : {
		type: Object,
		default: {
			lat: 0.0,
			lng: 0.0,
			title: ''
		}
	}
});

watch(() => props.geo, (newGeo) => {
	if (map === undefined) return false;
	googleMap.move(newGeo);
});

watch(() => props.marker, (newVal, oldVal) => {
	if ( newVal.lat === 0 ) return false;
	const obj = {
		lat: newVal.lat,
		lng: newVal.lng
	}
	if ( markers.value.length > 1 ) googleMap.deleteMarker(oldVal.title);
	googleMap.move(obj, newVal.title);
	googleMap.setMarker(props.geo);
});

const googleMap = {
	init: () => {
		const initMap = () => map = new google.maps.Map(document.getElementById("map"))
		window.initMap = initMap;
	},
	move: (geoObj, title="내회사") => {
		map.setCenter(geoObj);
		googleMap.setMarker(geoObj, title);
	},
	setMarker: (geoObj, title="내회사") => {
		const marker = new google.maps.Marker({
			position: geoObj,
			title: title
		});
		marker.setMap(map);
		markers.value.push(marker);
	},
	deleteMarker: () => {
		for (let i = 0; i < markers.value.length; i++ ) {
			markers.value[i].setMap(null);
		}
		markers.value = [];
	}
}

onMounted( () => {
	googleMap.init();

	const config = useRuntimeConfig();
	const loader = new Loader({
		apiKey: config.public.GOOGLE_API_KEY,
		version: "weekly",
	});

	loader.load().then(() => {
		map = new google.maps.Map(document.getElementById("map"), {
			zoom: 15,
		});
		googleMap.move(props.geo);
	});
});
</script>

<template>
	<div id="map" style="height:100%;"></div>
</template>
