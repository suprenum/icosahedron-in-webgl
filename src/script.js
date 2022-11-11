import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Guify from 'guify'
import icosahedronVertexShader from './shaders/icosahedron/vertex.glsl'
import icosahedronFragmentShader from './shaders/icosahedron/fragment.glsl'

// import icosahedronLinesVertexShader from './shaders/icosahedronLines/vertex.glsl'
import icosahedronLinesFragmentShader from './shaders/icosahedronLines/fragment.glsl'

import pixelVertexShader from './shaders/pixelShader/vertex.glsl'
import pixelFragmentShader from './shaders/pixelShader/fragment.glsl'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'











(function () {
    const items = document.querySelectorAll(".timeline-section li");
  
    function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function slideIn() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("slide-in");
        } else {
          items[i].classList.remove("slide-in");
        }
      }
    }
  
    window.addEventListener("load", slideIn);
    window.addEventListener("scroll", slideIn);
    window.addEventListener("resize", slideIn);

    
  })();
  

document.querySelectorAll('.accordion__button').forEach(button =>{
  
  button.addEventListener('click', () => {
    console.log("fdsfds");
    const accordionContent = button.parentElement.nextElementSibling;
    button.classList.toggle("accordion__button--active");
    const servicesContent = button.parentElement;
    
    if(button.classList.contains("accordion__button--active")){
      accordionContent.style.maxHeight = accordionContent.scrollHeight +  "px";
      servicesContent.classList.add("services-list-item--active");
      servicesContent.classList.remove("services-list-item--closed");
    }
    else{
      accordionContent.style.maxHeight = 0;
      servicesContent.classList.remove("services-list-item--active");
      servicesContent.classList.add("services-list-item--closed");
    }
  })
});

// var modal = document.querySelector(".modal");
//     var trigger = document.querySelector(".trigger");
//     var closeButton = document.querySelector(".close-button");

//     function toggleModal() {
//         modal.classList.toggle("show-modal");
//     }

//     function windowOnClick(event) {
//         if (event.target === modal) {
//             toggleModal();
//         }
//     }

//     trigger.addEventListener("click", toggleModal);
//     closeButton.addEventListener("click", toggleModal);
//     window.addEventListener("click", windowOnClick);

//   window.onscroll = function() {myFunction()};

// let header = document.getElementById("myHeader");
// let sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }












/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const landscapeTexture = textureLoader.load('/textures/1.jpg')
landscapeTexture.wrapS = THREE.MirroredRepeatWrapping
landscapeTexture.wrapT = THREE.MirroredRepeatWrapping

/**
 * Debug
 */
const gui = new Guify({
	align: 'right',
	theme: 'light',
	width: '1px',
	barMode: 'none',
})
const guiDummy = {}
guiDummy.clearColor = '#EAEAEA'

/**
 * Icosahedron
 */
const icosahedron = {}

// Geometry
icosahedron.geometry = new THREE.IcosahedronGeometry(1, 1)

// Material
icosahedron.material = new THREE.ShaderMaterial({
	vertexShader: icosahedronVertexShader,
	fragmentShader: icosahedronFragmentShader,
	uniforms: {
		uLandscape: { value: landscapeTexture },
		uMouse: { value: 0 },
		uTime: { value: 0 },
	},
})

// Mesh
icosahedron.mesh = new THREE.Mesh(icosahedron.geometry, icosahedron.material)
scene.add(icosahedron.mesh)

// Mouse speed
let mouse = 0
let lastX = 0
let lastY = 0
let speed = 0
document.addEventListener('mousemove', (e) => {
	speed = Math.sqrt((e.pageX - lastX) ** 2 + (e.pageY - lastY) ** 2) * 0.1
	lastX = e.pageX
	lastY = e.pageY
})

/**
 * Icosahedron lines
 */
const icosahedronLines = {}

// Geometry
icosahedronLines.geometry = new THREE.IcosahedronBufferGeometry(1.001, 1)
let length = icosahedronLines.geometry.attributes.position.array.length

let barycentric = []

for (let i = 0; i < length / 3; i++) {
	barycentric.push(0, 0, 1, /** */ 0, 1, 0, /** */ 1, 0, 0)
}

let aBarycentric = new Float32Array(barycentric)
icosahedronLines.geometry.setAttribute(
	'aBarycentric',
	new THREE.BufferAttribute(aBarycentric, 3)
)

// Material
icosahedronLines.material = new THREE.ShaderMaterial({
	vertexShader: icosahedronVertexShader,
	fragmentShader: icosahedronLinesFragmentShader,
	uniforms: {
		uLandscape: { value: landscapeTexture },
		uMouse: { value: 0 },
		uTime: { value: 0 },
	},
})

// Mesh
icosahedronLines.mesh = new THREE.Mesh(
	icosahedronLines.geometry,
	icosahedronLines.material
)
scene.add(icosahedronLines.mesh)

/**
 * Sizes
 */
const sizes = {
	width: 900,
	height: 900,
	pixelRatio: Math.min(window.devicePixelRatio),
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	// sizes.pixelRatio = Math.min(window.devicePixelRatio)

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	70,
	sizes.width / sizes.height,
	0.001,
	1000
)
camera.position.set(0, 0, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
})
renderer.setClearColor(guiDummy.clearColor, 0)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

gui.Register({
	type: 'folder',
	label: 'renderer',
	open: true,
})

gui.Register({
	folder: 'renderer',
	object: guiDummy,
	property: 'clearColor',
	type: 'color',
	label: 'clearColor',
	format: 'hex',
	onChange: () => {
		renderer.setClearColor(guiDummy.clearColor, 1)
	},
})

/**
 * Post-processing
 */
const PixelShader = {
	uniforms: {
		tDiffuse: { value: null },
		resolution: { value: null },
		pixelSize: { value: 1 },
		uTime: { value: 0 },
		uMaxRgbShift: { value: 0 },
	},
	vertexShader: pixelVertexShader,
	fragmentShader: pixelFragmentShader,
}

// Effect composer
const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(sizes.pixelRatio)

// Render pass
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Bokeh pass
const pixelPass = new ShaderPass(PixelShader)
pixelPass.uniforms['resolution'].value = new THREE.Vector2(
	window.innerWidth,
	window.innerHeight
)
pixelPass.uniforms['resolution'].value.multiplyScalar(window.devicePixelRatio)
effectComposer.addPass(pixelPass)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// Update material
	icosahedron.material.uniforms.uTime.value = elapsedTime
	icosahedronLines.material.uniforms.uTime.value = elapsedTime

	icosahedron.mesh.rotation.x = elapsedTime * 0.05
	icosahedron.mesh.rotation.y = elapsedTime * 0.05
	icosahedronLines.mesh.rotation.x = elapsedTime * 0.05
	icosahedronLines.mesh.rotation.y = elapsedTime * 0.05

	// Update mouse
	mouse -= (mouse - speed) * 0.05
	speed *= 0.99
	icosahedron.material.uniforms.uMouse.value = mouse
	icosahedronLines.material.uniforms.uMouse.value = mouse

	pixelPass.uniforms.uTime.value = elapsedTime
	pixelPass.uniforms.uMaxRgbShift.value = mouse / 5
	// PixelShader.uniforms.uMaxRgbShift.value = mouse / 5

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)
	// effectComposer.render()

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()