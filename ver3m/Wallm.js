// module 'Wallm.js'

import {scene} from './mainm.js';

class Wall {
	constructor (mesh, pos, normal) {
  	this.mesh = mesh;
  	this.pos = pos;
    this.normal = normal;
    scene.add (this.mesh);
  }
}

export {Wall};
