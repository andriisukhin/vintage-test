<template lang="pug">
transition(name="fade")
	div.block(v-if="message.length")
		.block__container
			img.block__img(:src="success")
			.block__text {{ message }}
		.block__progress
		
</template>

<script>
import { mapState } from "vuex";
import success from "../assets/images/success.svg";

export default {
	name: "Notifications",
	data() {
		return {
			success: success
		}
	},
	computed: {
		...mapState({
			message: state => state.MESSAGE
		})
	},
	mounted() {
		setTimeout(() => {
			this.$store.commit("STORE_MESSAGE", "");
		}, 5000)
	}
}
</script>

<style lang="scss" scoped>
	.block {
		position: fixed;
		top: 12px;
		right: 12px;
		padding: 15px 25px;
		background-color: rgba(#3db565, .8);
		width: 250px;
		border-radius: 3px;
		box-shadow: 2px 3px 4px 0px rgba(0,0,0, 0.5);
		&__container {
			position: relative;
			text-align: left;
		}
		&__text {
			display: inline-block;
			vertical-align: middle;
			max-width: 200px;
			font-size: 18px;
			line-height: 26px;
			color: #fff;
		}
		&__img {
			max-width: 30px;
			margin-right: 20px;
			display: inline-block;
			vertical-align: middle;
		}
		&__progress {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 3px;
			background-color: rgba(0,0,0,.5);
			border-radius: 0 0 3px 3px;
			transform: scaleX(1);
			animation: progress 5s forwards ease;
			transform-origin: 0 0;
			@keyframes progress {
				0% {
					transform: scaleX(1);
				}

				100% {
					transform: scaleX(0);
				}
			}
		}
	}
</style>