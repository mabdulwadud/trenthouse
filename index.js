// import * as THREE from 'three';
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// document.getElementById("container3D").appendChild(renderer.domElement);

// let object;
// let controls;

// const loader = new OBJLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'models/trenthouseobj.obj',
// 	// called when resource is loaded
// 	function ( object ) {

// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );



// const renderer = new THREE.WebGLRenderer({alpha: true});
// renderer.setSize( window.innerWidth, window.innerHeight );

// // adding directional and ambient lighting to the scene
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(500,500,500);
// topLight.castShadow = true;
// scene.add(topLight);

// const ambientLight = new THREE.AmbientLight(0x333333, 1);

// function animate(){
//     requestAnimationFrame(animate);

//     window.addEventListener("resize", function(){
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     renderer.render(scene, camera);
// }

// animate();

import * as THREE from 'three';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


// init

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.90, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:true});
document.getElementById('container3D').appendChild( renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 200;

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

  
// var ambientLight = new THREE.AmbientLight(0x413e4a, 0.4);
// ambientLight.position.set(100,0,100);
// var fillLight = new THREE.DirectionalLight(0x6EEAE2, 0.1);
// fillLight.position.set(-50,0,10);
// fillLight.castShadow = true;

var pointLight1 = new THREE.PointLight(0xffffff, 0.3);
pointLight1.castShadow = true;
pointLight1.position.set(0,0,100);

var pointLight2 = new THREE.PointLight(0xffffff, 0.3);
pointLight2.castShadow = true;
pointLight2.position.set(0,0,-100);


scene.add(pointLight1);
scene.add(pointLight2);


var objLoader = new OBJLoader();
objLoader.setPath('/models/');
objLoader.load('trenthouseobj.obj', function(object){
    object.position.y -= 60;
    scene.add(object);
});

// animation


function animate() {
    requestAnimationFrame(animate);
    controls.update();
	renderer.render( scene, camera );

}
animate();