import * as THREE from "three";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// initialize threejs scene
const scene = new THREE.Scene();

// create camera and renderer with transparent bg
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// create a renderer with transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
document.getElementById("container3D").appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(-100, -30, 30);

// enable camera controls
const minZoom = 1;
const maxZoom = 2;

const zoomSpeed = 0.005;
// add an event listener for the mouse wheel on zoom

window.addEventListener("wheel", function(event) {
  if (event.deltaY < 0){
    // zoom in
    camera.position.z -= zoomSpeed;

  }else{
    camera.position.z += zoomSpeed;
  }

  // clamp the camera position within specified limits
  camera.position.z = THREE.Math.clamp(camera.position.z, minZoom, maxZoom);

  // update camera position
  camera.updateProjectionMatrix();
});


var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = false;

//point light 1
var pointLight1 = new THREE.PointLight(0xffffff, 0.3);
pointLight1.castShadow = true;
pointLight1.position.set(0, 0, 100);

//point light 2
var pointLight2 = new THREE.PointLight(0xffffff, 0.3);
pointLight2.castShadow = true;
pointLight2.position.set(0, 0, -100);

// adding both lights to the scene
scene.add(pointLight1);
scene.add(pointLight2);

// loading material
var myObj = undefined;
var mtlLoader = new MTLLoader();
mtlLoader.load("models/model.mtl", function(materials){
    materials.preload();
    //loading object
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("models/model.obj", function(object){
        // setting undefined mesh to object
        myObj = object;
        scene.add(myObj);
    });
});

// animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Get the container3D element
const container3D = document.getElementById('container3D');

// Create a new overlay element
const overlay = document.createElement('div');

// Detect the user's device and set the appropriate text
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  overlay.textContent = 'Swipe or pinch to interact'; // Mobile device
} else {
  overlay.textContent = 'Click and drag to interact'; // Desktop or laptop
}

overlay.className = 'overlay';
// overlay.textContent = 'Swipe or pinch to interact';

// Apply styling to the overlay
overlay.style.position = 'absolute';
overlay.style.top = '50%';
overlay.style.left = '50%';
overlay.style.transform = 'translate(-50%, -50%)';
overlay.style.fontSize = '24px';
overlay.style.color = 'white';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
overlay.style.padding = '10px';
overlay.style.borderRadius = '5px';
overlay.style.transition = 'opacity 1s';

// Add the overlay to the container3D element
container3D.appendChild(overlay);

// Fade out the overlay after 3 seconds
setTimeout(function () {
  overlay.style.opacity = '0';
}, 3000);


const scrollActive = document.getElementById("add-in-paper");
const arrow = document.getElementById("arrow-down");

arrow.addEventListener("click", function() {
  // Get the section element
  // Calculate the scroll position to center the section in the viewport
  const yOffset = window.innerHeight / 2 - scrollActive.offsetHeight / 2;

  // Scroll to the calculated position with smooth behavior
  window.scrollTo({
    top: scrollActive.offsetTop - yOffset,
    behavior: "smooth",
  });
});

// Function to handle GIFs visibility
function handleGIFVisibility(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const gif = entry.target;
      const src = gif.getAttribute('data-src');
      if (src) {
        gif.setAttribute('src', src);
        gif.removeAttribute('data-src');
      }
    }
  });
}

// Create an Intersection Observer
const gifObserver = new IntersectionObserver(handleGIFVisibility, {
  root: null, // Viewport
  threshold: 0.5, // Animation starts when the middle of the GIF is in the middle of the viewport
});

// Select all GIF elements
const gifs = document.querySelectorAll('.gif');

// Observe each GIF element
gifs.forEach((gif) => {
  gifObserver.observe(gif);
});