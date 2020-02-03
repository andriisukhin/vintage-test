<template lang="pug">
	.google-map#map(ref="google_map")
</template>

<script>
import styles from "@/map_styles/googleMapStyle.json";
import markerIcon from "@/assets/images/marker.png";

export default {
	name: 'GoogleMap',
	props: {
		marker: { type: Object, required: true },
	},
	data() {
		return {
			map: "",
			styles: styles,
			markerIcon: markerIcon
		}
	},
	watch: {
		marker() {
			this.setCoords(this.marker);
		}
	},
	mounted() {
		this.initMap();
	},
	methods: {
		setCoords(mark) {
			const position = new google.maps.LatLng(mark.position.latitude, mark.position.longitude);
			const marker = {
				map: this.map,
				position: position,
				icon: markerIcon
			}
			new google.maps.Marker(marker);
			this.map.setCenter(new google.maps.LatLng(mark.position.latitude, mark.position.longitude));
		},
		initMap() {
			const element = this.$refs.google_map;
			const options = {zoom: 13, disableDefaultUI: true, styles: this.styles};
			this.map = new google.maps.Map(element, options);
			this.setCoords(this.marker);
		}
	}
}
</script>

<style lang="scss">
	.google-map {
        width: 100%;
        height: 100%;
        background: gray;
	}
</style>