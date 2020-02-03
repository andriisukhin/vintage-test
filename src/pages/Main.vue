<template lang="pug">
	main
		Poster
		Offices
		Contact
		Notification(v-if="message.length")
</template>

<script>
import { mapState } from "vuex";
import AOS from "aos";
import Poster from "@/components/Poster.vue";
import Offices from "@/components/Offices.vue";
import Contact from "@/components/Contact.vue";
import Notification from "@/components/Notification.vue";

export default {
	name: 'home',
	components: {
		Poster,
		Offices,
		Contact,
		Notification,
	},
	computed: {
		...mapState({
			message: state => state.MESSAGE
		})
	},
	mounted() {
		AOS.init();
	}
}
</script>

<style lang="scss">
@import "../../node_modules/aos/dist/aos.css"
</style>
