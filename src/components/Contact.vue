<template lang="pug">
	section.block
		Dots
		.block__container.section-container
			h2.block__title Contact Us
			.block__inner
				.block__form.form
					.form__container(:class="{error: nameError.length}" data-aos="fade-right" data-aos-delay="200")
						input.form__input#name(type="text" v-model="name" autocomplete="off")
						label.form__label(for="name") Name
						.form__line
						transition(name="fade")
							.form__error(v-if="nameError.length") {{ nameError }}
					.form__container(:class="{error: phoneError.length}" data-aos="fade-right" data-aos-delay="300")
						input.form__input#phone(type="text" v-model="phone")
						label.form__label(for="phone") Phone
						.form__line
						transition(name="fade")
							.form__error(v-if="phoneError.length") {{ phoneError }}
					.form__container(:class="{error: emailError.length}" data-aos="fade-right" data-aos-delay="400")
						input.form__input#email(type="text" v-model="email" name="email")
						label.form__label(for="email") E-mail
						.form__line
						transition(name="fade")
							.form__error(v-if="emailError.length") {{ emailError }}
					.form__container(data-aos="fade-right" data-aos-delay="500")
						input.form__input#agreement(type="checkbox" v-model="agreement")
						label.form__label(for="agreement") I agree the processing of personal data
						transition(name="fade")
							.form__error(v-if="agreementError") You cant send the form without agreement.
					button.form__btn.btn(type="button" :class="{form__btn_disabled: status == 'pending'}" @click="checking") Get in touch
						.btn__inner
							.btn__clone Get in touch
				.block__content(data-aos="fade")
					p Please tell us more about your request and give us info about your company and country
				
</template>

<script>
import { mapState } from 'vuex';
import Dots from './Dots.vue';

export default {
	name: 'Contact',
	data() {
		return {
			name: "",
			phone: "",
			email: "",
			agreement: false,
			regexes: {
				email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				phone: /^\+380\d{9}$/,
				name: /^[\D\s]{1,30}$/
			},
			emailError: '',
			phoneError: '',
			nameError: '',
			agreementError: '',
		};
	},
	components: {
		Dots
	},
	computed: {
		...mapState({
			status: state => state.STATUS,
		})
	},
	methods: {
		async send() {
			const form = {
				name: this.name,
				phone: this.phone,
				email: this.email,
				agreement: this.agreement
			};
			try {
				const response = await this.$store.dispatch("SEND", { form });
				this.$store.commit('STORE_DATA', response.data.json.form)
				this.$store.commit('STORE_MESSAGE', 'Success!')
				this.$store.commit('STORE_STATUS', 'success')
			} catch {
				this.$store.commit('STORE_MESSAGE', 'Something goes wrong, try one more time')
       			this.$store.commit('STORE_STATUS', 'rejected')
			}
		},
		validate(regex, field, msg) {
			return regex.test(field) ? '' : msg;
		},
		checking() {
			this.agreementError = !this.agreement;
			if (this.agreementError) return;

			this.emailError = !this.email.length ? 'Field is required' : this.validate(this.regexes.email, this.email, 'Field is invalid, must be example@mail.com');
			this.phoneError = !this.phone.length ? 'Field is required' : this.validate(this.regexes.phone, this.phone, 'Field is invalid, must be +380*********');
			this.nameError = !this.name.length ? 'Field is required' : this.validate(this.regexes.name, this.name, 'Field is invalid, must be only letters and spaces, max 30 symbols');

			!this.emailError.length && !this.phoneError.length && !this.nameError.length && this.send();
		}
	},
}
</script>

<style lang="scss" scoped>
.dots {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.block {
	background: #3db565;
	padding: 99px 0;
	position: relative;
	&__title {
		color: #fff;
	}
	&__container {
		position: relative;
	}

	&__inner {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	&__form {
		width: 50%;
		margin-top: 29px;
	}
	&__content {
		width: 50%;
		margin-top: 29px;
	}
	p {
		font-size: 18px;
		margin: 0;
		padding: 9px 0 0 36px;
		line-height: 35px;
	}
}
.form {
	&__container {
		width: 93%;
		position: relative;
		padding-bottom: 10px;
		margin-bottom: 6px;
		&:nth-child(4) {
			.form__error {
				right: auto;
				left: 0;
				top: 75%;
			}
		}
	}
	&__label {
		font-size: 18px;
		line-height: 35px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	&__line {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 1px;
		width: 100%;
		background: #292929;
		transition: color .2s ease;
	}
	&__input {
		width: 88%;
		margin-top: 8px;
		padding-left: 65px;
		background: none;
		border: 0;
		outline: none;
		position: relative;
		&:focus {
			color: #fff;
			& + label {
				color: #fff;
				& + .form__line {
					background-color: #fff;
				}
			}
		}
	}
	&__btn {
		padding: 35px 89px 38px 95px;
		background: #292929;
		font-weight: 800;
		font-size: 11px;
		text-transform: uppercase;
		margin-left: 1px;
		margin-top: 21px;
		line-height: 11px;
		letter-spacing: 0.5px;
		cursor: pointer;
		position: relative;
		&_disabled {
			&:before {
				position: absolute;
				content: "SENDING...";
				top: 0;
				left: 0;
				width: 100%; 
				padding: 35px 0 38px;
				background: #fff;
				color: #3db565;
				font-weight: 800;
				font-size: 11px;
				text-transform: uppercase;
				line-height: 11px;
				letter-spacing: 0.5px;
				white-space: nowrap;
				pointer-events: none;
			}
		}
	}
	input[type="checkbox"] {
		opacity: 0;
		height: 0;
		width: 0;
		padding-left: 0;
		& + label {
			position: relative;
			padding-left: 28px;
			color: #fff;
			line-height: 41px;
			cursor: pointer;
			&:before {
				content: "";
				position: absolute;
				top: 50%;
				left: -5px;
				width: 15px;
				height: 15px;
				background-color: #fff;
				transform: translateY(-50%);
			}
			&:after {
				content: url(../assets/images/check.png);
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: -4px;
				display: none;
			}
		}
		&:checked {
			& + label:after {
				display: block;
			}
		}
	}
	&__error {
		position: absolute;
		top: 100%;
		right: 0;
		color: #b90000;
	}
	.error {
		.form__line {
			background: #b90000;
		}
	}
	
}
.btn {
	overflow: hidden;
	&__inner {
		position: absolute;
		top: 0;
		left: 0;
		background: transparent;
		overflow: hidden;
		transition: transform .3s ease;
		width: 100%;
		height: 100%;
		transform: translate3d(-100%, 0, 1px);
		pointer-events: none;
	}
	&__clone {
		position: absolute;
		top: 0;
		left: 0;
		padding: 35px 89px 38px 95px;
		background: #fff;
		color: #292929;
		font-weight: 800;
		font-size: 11px;
		text-transform: uppercase;
		line-height: 11px;
		letter-spacing: 0.5px;
		white-space: nowrap;
		transition: transform .3s ease;
		transform: translate3d(100%, 0, 1px);
		pointer-events: none;
	}
	@media(min-width: 1200px) {
		&:hover {
			.btn {
				&__inner {
					transform: translate3d(0%, 0, 1px);
				}
				&__clone {
					transform: translate3d(0%, 0, 1px);
				}
			}
		}
	}
}
@media(max-width: 1200px) {
	.btn {
		&__inner {
			display: none;
		}
		&__clone {
			display: none;
		}
	}
}
@media(max-width: 960px) {
	.form {
		input[type="checkbox"] {
			& + label {
				display: block;
				line-height: 24px;
				margin-top: 10px;
			}
		}
	}
}

@media(max-width: 650px) {
	.block {
		&__inner {
			flex-direction: column-reverse;
		}
		&__form {
			width: 100%;
		}
		&__content {
			width: 100%;
			p {
				padding: 0;
			}
		}
	}
	.form {
		&__container {
			width: 100%;
		}
		&__input {
			width: 80%;
		}
		&__btn {
			display: block;
			width: 80%;
			margin: 0 auto;
			padding: 35px 0;
		}
	}
}
</style>