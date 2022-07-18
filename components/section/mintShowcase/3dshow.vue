<template>
<div>
    <div ref="canvas">

    </div>
</div>
</template>

<script>
let THREE = null
if (process.client) {
    THREE = require('three');
}
export default {
    data() {
        return {
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000),
            renderer: new THREE.WebGLRenderer(),
            boxGeometry: new THREE.BoxGeometry(2, 2, 2),
            planeMaterial: new THREE.MeshBasicMaterial({
                color: 0xFFFFFF
            }),
            boxMaterial: new THREE.MeshBasicMaterial({
                // color: 0x000229
            }),
            box:null,

        }
    },
    mounted() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.$refs.canvas.appendChild(this.renderer.domElement)

        const axesHelper = new THREE.AxesHelper(5)
        this.camera.position.set(0, 2, 5);

        //to move object freely using mouse and to zoom in and zoom out 
        let OC = require("three/examples/jsm/controls/OrbitControls.js")
        const orbit = new OC.OrbitControls(this.camera, this.renderer.domElement)
        orbit.update()

        this.box = new THREE.Mesh(this.boxGeometry, this.boxMaterial)

        this.scene.add(axesHelper)
        this.scene.add(this.box);

        this.renderer.setAnimationLoop(this.animate)
    },
    methods: {
        animate() {
            this.box.rotation.x +=0.01
            this.box.rotation.y += 0.01
            this.renderer.render(this.scene, this.camera);
        }
    }

}
</script>
