<script setup>
const url='://maps.googleapis.com/maps/api/place/details/output';

const props = defineProps({
	keyword: {
		type: String,
		default: ''
	}
});
 
const { data, pending, error, refresh } = await useFetch( url, {
	key: process.env.GOOGLE_API_KEY,
	query: props.keyword,
	language: 'ko',
	region: 'kr',
	type: 'restaurant'
}) 
</script>
