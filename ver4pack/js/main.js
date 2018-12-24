import $ from 'jquery';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import {Ball} from './Ballm.js';
import {Wall} from './Wallm.js';

import {scene, init, walls} from './threem.js';

//////////////////////////////////////////////////////
// global variables
/*
var scene, walls;  // moved to 'threem.js'
*/
var renderer, camera;
var balls = [];
var run = false;

init();  // defined in threem.js

initStuff();

animate();

$("#start").click(function() {
  run = !run;
  if (! run) {
  	$('#start').text ('start')
  } else {
  	$('#start').text ('pause')
  }
});

// the rest of init ...
function initStuff () {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 400;
  camera.position.y = 300;
  // let controls = new THREE.OrbitControls(camera, renderer.domElement);
  let controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  //////////////////////////////////////////////////////////
  
  let ballMesh0 = new THREE.Mesh (new THREE.SphereGeometry(5,20,20), new THREE.MeshNormalMaterial());
  let ballMesh = ballMesh0.clone();
  let ball = new Ball (ballMesh, new THREE.Vector3(0,100,0))
  balls.push (ball);
  
	let wallMesh0 = new THREE.Mesh (new THREE.PlaneGeometry(200,200), new THREE.MeshNormalMaterial({side:THREE.DoubleSide}));
	let wallMesh1 = wallMesh0.clone();
  wallMesh1.position.set (0,0,0);
	wallMesh1.rotation.x = -Math.PI/2;
	walls.push ( new Wall (wallMesh1, new THREE.Vector3 (0,0,0), new THREE.Vector3(0,1,0)) );

/*
  let wallMesh2 = wallMesh0.clone();
  wallMesh2.position.set (-100,100,0);
	wallMesh2.rotation.y = Math.PI/2;
	walls.push ( new Wall (wallMesh2, new THREE.Vector3 (-100,0,0), new THREE.Vector3(1,0,0)) );
*/
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);

	if (! run) return;

	balls.forEach (function(b) { b.update(0.1) });

	renderer.render(scene, camera);
}

