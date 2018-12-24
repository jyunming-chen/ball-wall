// module "Ballm.js"
import {scene, walls} from './threem.js';

class Ball {
	constructor (mesh, pos) {
  	this.pos = pos;
  	this.vel = new THREE.Vector3();
  	this.force = new THREE.Vector3(0,-10,0);  // gravity
    this.mesh = mesh;
    scene.add (this.mesh);
  }
  collideWall (wall) {
  	let point = this.pos.clone().sub (wall.pos);
    if (point.dot(wall.normal) < 0 && this.vel.dot(wall.normal) < 0) {
      this.pos.add (point.projectOnVector(wall.normal));
      this.vel.add( this.vel.clone().projectOnVector(wall.normal).multiplyScalar(-2));
    }  
  }
  update (dt) {
  	this.vel.add (this.force.clone().multiplyScalar (dt));
		this.pos.add (this.vel.clone().multiplyScalar (dt));  
		
		// global array: walls
    // this will NOT work ...
    // walls.forEach (function (w) { this.collideWall (w)});
		
    // arguments of forEach:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    //arr.forEach(function callback(currentValue[, index[, array]]) {
    //your iterator
		//}[, thisArg]);
    
    walls.forEach (function (w) { this.collideWall (w); }, this);  
    // here, this (THIS ball) is passed to forEach as thisArg

	this.mesh.position.copy (this.pos);
  }
  
}

export {Ball};
