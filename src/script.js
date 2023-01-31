/* eslint-disable no-mixed-spaces-and-tabs */
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Guify from 'guify'
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
	  if(window.innerWidth >= 560){
		return(
			rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight  || document.documentElement.clientHeight ) &&
        rect.right <= (window.innerWidth  || document.documentElement.clientWidth )
		);
	  }
      else {
		return (

		
			true
			
		  );
	  }
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

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = "none";
  }
} 	

var modal2 = document.getElementById("myModal1");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn2.onclick = function() {
  modal2.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
	modal2.style.display = "none";
  }
} 

var modal1 = document.getElementById("promoModal");

// Get the button that opens the modal
var btn1 = document.getElementById("promoButton");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn1.onclick = function() {
  modal1.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
	modal1.style.display = "none";
	let iframe = document.querySelector('iframe')
	if (iframe)
	{
		let iframeSrc = iframe.src
		iframe.src =  iframeSrc
	}
  }
} 	

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



// pause the video when click close span

const closeVideoBtns = document.querySelectorAll('.close')

closeVideoBtns.forEach(btn =>
{
	btn.addEventListener('click', (e) =>
	{
		let iframes = document.querySelectorAll('iframe')
		iframes.forEach(iframe =>
		{
			if (iframe)
			{
				let iframeSrc = iframe.src
				iframe.src =  iframeSrc
			}
		})
	})
})

const modalWindows = document.querySelectorAll('.modal')

window.addEventListener('click', (e) =>
{
	modalWindows.forEach(modal =>
	{
		if (e.target === modal)
		{
			modal.style.display = 'none'
		}
		let iframes = document.querySelectorAll('iframe')
		iframes.forEach(iframe =>
		{
			if (iframe)
			{
				let iframeSrc = iframe.src
				iframe.src =  iframeSrc
			}
		})
	})
})





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

// /**
//  * Debug
//  */
// const gui = new Guify({
// 	align: 'right',
// 	theme: 'light',
// 	width: '1px',
// 	barMode: 'none',
// })
// const guiDummy = {}
// guiDummy.clearColor = '#EAEAEA'

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

// // Mouse speed
// let mouse = 0
// let lastX = 0
// let lastY = 0
// let speed = 0
// document.addEventListener('mousemove', (e) => {
// 	speed = Math.sqrt((e.pageX - lastX) ** 2 + (e.pageY - lastY) ** 2) * 0.1
// 	lastX = e.pageX
// 	lastY = e.pageY
// })

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
const sizes = {}

sizes.width = window.innerWidth
sizes.height = window.innerHeight
sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	// sizes.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1.5), 2)

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
camera.position.set(0, 0, 2.8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Renderer
 */
// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
})
renderer.setClearColor(0xEAEAEA, 1)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height )
renderer.setPixelRatio(sizes.pixelRatio)

// gui.Register({
// 	type: 'folder',
// 	label: 'renderer',
// 	open: true,
// })

// gui.Register({
// 	folder: 'renderer',
// 	object: guiDummy,
// 	property: 'clearColor',
// 	type: 'color',
// 	label: 'clearColor',
// 	format: 'hex',
// 	onChange: () => {
// 		renderer.setClearColor(guiDummy.clearColor, 1)
// 	},
// })

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

	// // Update mouse
	// mouse -= (mouse - speed) * 0.05
	// speed *= 0.99
	// icosahedron.material.uniforms.uMouse.value = mouse
	// icosahedronLines.material.uniforms.uMouse.value = mouse

	pixelPass.uniforms.uTime.value = elapsedTime
	// pixelPass.uniforms.uMaxRgbShift.value = mouse / 5
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