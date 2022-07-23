<template>
  <div>
    <div ref="canvas"></div>
  </div>
</template>

<script>
let THREE = null;
if (process.client) {
  THREE = require("three");
}
export default {
  data() {
    return {
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ),
      renderer: new THREE.WebGLRenderer(),
    };
  },
  async mounted() {
    //rendering the view section
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.canvas.appendChild(this.renderer.domElement);
    // displaying axis and camera position

    this.camera.position.set(-5, 2, 5);

    //to move object freely using mouse and to zoom in and zoom out
    let OC = require("three/examples/jsm/controls/OrbitControls.js");
    const orbit = new OC.OrbitControls(this.camera, this.renderer.domElement);
    orbit.update();

    // 3d models
    const modelLoader = require("three/examples/jsm/loaders/GLTFLoader.js");

    // console.log(toy)
    const assetLoader = await new modelLoader.GLTFLoader();
    assetLoader.load(
      "models/showcase.glb",
      (gltf) => {
        const model = gltf.scene;
        this.scene.add(model);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    // adding object to scene
    this.renderer.setClearColor(0xc202d3);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    //setting animation loop
    this.renderer.setAnimationLoop(this.animate);
  },
  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
