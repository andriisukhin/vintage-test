<template lang="pug">
    .dots
</template>

<script>
import {Renderer, Program, Texture, Mesh, Vec2, Flowmap, Triangle} from "ogl";
import bgGreen from "../assets/images/bg-green.jpg";
const initDots = () => {
	const el = document.querySelector(".dots");
	const vw = el.clientWidth;
	const vh = el.clientHeight;
	const vertex = `
		attribute vec2 uv;
		attribute vec2 position;
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 0, 1);
		}
	`;

	const fragment = `
		precision highp float;
		precision highp int;
		uniform sampler2D tWater;
		uniform sampler2D tFlow;
		uniform float uTime;
		varying vec2 vUv;
		void main() {
			vec3 flow = texture2D(tFlow, vUv).rgb;
			vec2 uv = gl_FragCoord.xy / ${vw <= 768 ? vw * 2 : vw}.0;  
			uv += flow.xy * 0.05;
			vec3 tex = texture2D(tWater, uv).rgb;
			gl_FragColor = vec4(tex.rgb, 1);
		}
	`;

	{
		const renderer = new Renderer({dpr: 2});
		const gl = renderer.gl;
		document.querySelector('.dots').appendChild(gl.canvas);

		let aspect = 1;
		const mouse = new Vec2(-1);
		const velocity = new Vec2();

		function resize() {
			const el = document.querySelector(".dots");
			
			const vw = el.clientWidth;
			const vh = el.clientHeight;
		
			renderer.setSize(vw, vh);
			aspect = vw / vh
		}
		window.addEventListener('resize', resize, false);
		resize();

		const flowmap = new Flowmap(gl);

		const geometry = new Triangle(gl);

		const texture = new Texture(gl, {wrapS: gl.REPEAT, wrapT: gl.REPEAT});
		const img = new Image();
		img.onload = () => texture.image = img;
		img.src = bgGreen;

		const program = new Program(gl, {
			vertex,
			fragment,
			uniforms: {
				uTime: {value: 0},
				tWater: {value: texture},
				tFlow: flowmap.uniform,
			}
		});

		const mesh = new Mesh(gl, {geometry, program});

		const isTouchCapable = 'ontouchstart' in window;
		if (isTouchCapable) {
			window.addEventListener('touchstart', updateMouse, false);
			window.addEventListener('touchmove', updateMouse, false);
		} else {
			window.addEventListener('mousemove', updateMouse, false);
		}

		let lastTime;
		const lastMouse = new Vec2();
		function updateMouse(e) {
			if (e.changedTouches && e.changedTouches.length) {
				e.x = e.changedTouches[0].pageX;
				e.y = e.changedTouches[0].pageY;
			}
			if (e.x === undefined) {
				e.x = e.pageX;
				e.y = e.pageY;
			}
			mouse.set(
				e.x / gl.renderer.width,
				1.0 - e.y / gl.renderer.height / 1.4
			);
			if (!lastTime) {
				lastTime = performance.now();
				lastMouse.set(e.x, e.y);
			}
			const deltaX = e.x - lastMouse.x;
			const deltaY = e.y - lastMouse.y;
			lastMouse.set(e.x, e.y);
			let time = performance.now();
			let delta = Math.max(14, time - lastTime);
			lastTime = time;
			velocity.x = deltaX / delta;
			velocity.y = deltaY / delta;
			velocity.needsUpdate = true;
		}

		requestAnimationFrame(update);
		function update(t) {
			requestAnimationFrame(update);
			if (!velocity.needsUpdate) {
				mouse.set(-1);
				velocity.set(0);
			}
			velocity.needsUpdate = false;
			flowmap.aspect = aspect;
			flowmap.mouse.copy(mouse);
			flowmap.velocity.lerp(velocity, velocity.len ? 0.5 : 0.1);
			flowmap.update();
			program.uniforms.uTime.value = t * 0.001;
			renderer.render({scene: mesh});
		}
	}
}
export default {
    name: "Dots",
    data() {
        return {
            initDots: initDots,
        }
    },
    mounted() {
        this.initDots();
    }
}
</script>