<template lang="pug">
	section.block
		.block__container.section-container
			h1.block__title(data-aos="fade-down") Contacts
			.block__inner
				.block__column.column(data-aos="fade-right" fade-delay="500")
					h2.column__title
						span.green GMS
						span Headquarters
					.column__container
						.column__item.item
							.item__info Global Message Services Ukraine LLC Bundesstrasse 5 | 3rd Floor
							.item__info 6300 Zug
							.item__info Switzerland
							a.item__phone.phone-link(href="tel:+41415446200") +41 41 544 62 00
						.column__item
							.item__info Email
							a.item__link(href="mailto:info@gms-worldwide.com") info@gms-worldwide.com
							.item__info Send message
							a.item__link(href="viber://chat?number=%2B41415446200") viber us
							.item__info Send form
							a.item__link(href="#contact-form") Contact us
				.block__column.column(data-aos="fade-left" fade-delay="500")
					h2.block__title 
						span Technical support
						span.green 24/7
					.column__info GMS understands that it can be hard to follow all new technologies. We regularly provide for all our clients educational trainings to make yout operator's business eam more and better though our best practices.
					a.column__phone.phone-link(href="tel:+41415446200") +41 41 544 62 00
						
					
</template>

<script>
export default {
	name: 'Poster',
}
</script>

<style lang="scss" scoped>
.block {
	padding: 50px 0 93px;
	&__inner {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-top: 38px;
	}
	&__column {
		width: 50%;
		&:last-child {
			width: 46%;
		}
	}
}
.column {
	&__container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-top: 40px;
	}
	&__item {
		width: 50%;
	}
	&__info {
		margin-top: 40px;
	}
}
.item {
	&__link {
		color: #3db565;
		text-transform: uppercase;
		font-weight: 800;
	}
}

@media(max-width: 960px) {
	.column {
		&__item {
			&:last-child{
				width: 45%;
			}
		}
	}
	.item {
		&__phone {
			margin-top: 40px;
		}
	}
}

@media(max-width: 650px) {
	.block {
		&__inner {
			flex-direction: column;
		}
		&__column {
			width: 100%;
			&:last-child {
				width: 100%;
				margin-top: 40px;
			}
		}
	}
	.column {
		&__container {
			flex-direction: column-reverse;
		}
		&__item {
			width: 100%;
			&:last-child {
				width: 100%;
			}
		}
		&__phone {
			margin-top: 20px;
		}
	}
	.item {
		&__phone {
			margin-top: 20px;
		}
	}
}

</style>