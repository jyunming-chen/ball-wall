// module: threem.js
// prepare global variables from three.js
// for Ball.js & Wall.js
//  
// global variables
var scene, walls;

function init() {

  scene = new THREE.Scene();

  walls = []; // required in Ball.js
}

export {scene, init, walls};

