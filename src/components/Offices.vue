<template lang="pug">
	section.block
		.block__container.section-container
			.block__column(data-aos="fade-down" data-aos-delay="200") 
				h2.block__title Our Offices
				.block__tabs
					button.block__tab(v-for="office in offices" type="button" :class="{block__tab_active: activeOffice == office.city}" @click="activeOffice = office.city") {{ office.city }}
				div
					transition(name="fade" mode="out-in")
						.block__info.info(v-for="(office, o) in offices" v-if="activeOffice == office.city" :key="office.city")
							.info__title {{ office.title }}
							.info__location.location
								.location__item {{ office.address }}
								.location__item {{ office.index }}
								.location__item {{ office.country }}
			.block__map(data-aos="fade" data-aos-delay="200")
				GoogleMap(:marker="findOffice(activeOffice)")
</template>

<script>
import GoogleMap from './Map.vue';

export default {
	name: 'Offices',
	components: {
		GoogleMap
	},
	data() {
		return {
			activeOffice: 'Kyiv',
			offices: [
				{
					city: 'Kyiv',
					title: 'Global Message Services Ukraine LLC',
					address: 'Kyiv, Stepan Bandera, 33',
					index: '02066',
					country: 'Ukraine',
					location: {
						position: {
							latitude: 50.489309,
							longitude: 30.489541
						}
					}
				},
				{
					city: 'New York',
					title: 'Global Message Services USA LLC',
					address: '192-100 W 88th St',
					index: '10024',
					country: 'USA',
					location: {
						position: {
							latitude: 40.788230,
							longitude: -73.972267
						}
					}
				},
				{
					city: 'Guangzhou',
					title: 'Global Message Services China LLC',
					address: 'Guangzhou Shi, Yuexiu Qu, 33',
					index: '02066',
					country: 'China',
					location: {
						position: {
							latitude: 23.129575,
							longitude: 113.264379
						}
					}
				},
				{
					city: 'Barcelona',
					title: 'Global Message Services Spain LLC',
					address: "Avinguda del Portal de l'Angel, 17",
					index: '08002',
					country: 'Spain',
					location: {
						position: {
							latitude: 41.385436,
							longitude: 2.173038
						}
					}
				},
			]
		};
	},
	methods: {
		findOffice(c) {
			return this.offices.find(item => item.city === c).location;
		},
	}
}
</script>

<style lang="scss" scoped>

.block {
	background: #272727;
	color: #fff;
	padding: 100px 0 151px;
	position: relative;

	&__tabs {
		margin-top: 35px;
	}

	&__tab {
		text-transform: uppercase;
		font-weight: 300;
		margin-right: 22px;
		font-size: 11px;
		letter-spacing: 0.5px;
		outline: none;
		cursor: pointer;
		transition: color .3s ease;
		&_active {
			color: #3db565;
		}
	}
	&__column {
		max-width: 50%;
	}
	&__map {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 50%;
	}
}

.info {
	&__title {
		font-size: 26px;
		letter-spacing: 0.8px;
		margin-top: 40px;
		padding-left: 1px;
	}
	&__location {
		margin-top: 30px;
	}
}

.location {
	&__item {
		font-size: 10px;
		line-height: 20px;
		letter-spacing: 0.55px;
	}
}

@media(min-width: 1200px) {
	.block {
		&__tab {
			&:hover {
				color: #3db565;
			}
		}
	}	
}

@media(max-width: 1200px) {
	.info {
		&__title {
			font-size: 24px;
		}
	}
} 

@media(max-width: 650px) {
	.block {
		padding: 100px 0 250px;
		&__column {
			width: 100%;
			max-width: 100%;
		}
		&__map {
			bottom: 0;
			top: auto;
			width: 100%;
			height: 220px;
		}
		&__tabs {
			display: flex;
			justify-content: space-between;
		}
		&__tab {
			margin-right: 0;
		}
	}
}

</style>