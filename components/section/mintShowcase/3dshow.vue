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

        this.camera.position.set(0, 13, -25);

        //to move object freely using mouse and to zoom in and zoom out
        let OC = require("three/examples/jsm/controls/OrbitControls.js");
        const orbit = new OC.OrbitControls(this.camera, this.renderer.domElement);
        orbit.update();

        // 3d models
        const modelLoader = require("three/examples/jsm/loaders/GLTFLoader.js");
        const loader = require('three/examples/jsm/loaders/FBXLoader')

        const fbxLoader = new loader.FBXLoader()
        fbxLoader.load(
                'models/mint.fbx',
                (object) => {
                    // object.traverse(function (child) {
                    //     if ((child as THREE.Mesh).isMesh) {
                    //         // (child as THREE.Mesh).material = material
                    //         if ((child as THREE.Mesh).material) {
                    //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
                    //         }
                    //     }
                    // })
                    // object.scale.set(.01, .01, .01)
                    this.scene.add(object)
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                })
        // console.log(toy)
        // const homeloader = await new modelLoader.GLTFLoader();
        // homeloader.load(
        //     "models/nftsoul.glb",
        //     (gltf) => {
        //         const model = gltf.scene;
        //         this.scene.add(model);
        //     },
        //     undefined,
        //     (error) => {
        //         console.error(error);
        //     }
        // );
        // const floorloader = await new modelLoader.GLTFLoader();
        // floorloader.load(
        //     "models/ground.glb",
        //     (gltf) => {
        //         const model = gltf.scene;
        //         model.position.set(10,-0.3,20)
        //         this.scene.add(model);
        //     },
        //     undefined,
        //     (error) => {
        //         console.error(error);
        //     }
        // );
        //adding image
        //background
        // var texture = new THREE.TextureLoader().load('images/background.jpg');
        // var geometry = new THREE.BoxBufferGeometry(400, 200, 5);
        // var material = new THREE.MeshBasicMaterial({
        //     map: texture
        // });
        // const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(0, 65, 100)
        // this.scene.add(mesh);
        // // ground
        // var grassTexture = new THREE.TextureLoader().load('images/grass.jpg');
        // var grassgeometry = new THREE.BoxBufferGeometry(100, 100, 10);
        // var grassmaterial = new THREE.MeshBasicMaterial({
        //     map: grassTexture
        // });
        // const grass = new THREE.Mesh(grassgeometry, grassmaterial);
        // // grass.rotation.x = -0.5 * Math.PI

        // grass.position.set(20,65,200)
        // this.scene.add(grass);

        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3)
        // this.scene.add(directionalLight)
        // directionalLight.position.set(0, 100, 0)
        // const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5) //5 is size of light
        // this.scene.add(dLightHelper)

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
