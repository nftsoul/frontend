<template>
<div id="blocker">
    <div ref="canvas">
        <div id="instructions" class="dark-bg">
            <v-row no-gutters class="mb-0 px-5" :class="setPadding()" justify="space-between">
                <v-btn text v-if="fullmode==true" @click="$store.commit('three/setFullMode',false)" class="text-capitalize full-view-btn">
                    <v-icon>mdi-fullscreen-exit</v-icon>
                    Exit Full Screen
                </v-btn>
                <p style="font-size:25px">
                    Click to Enter
                </p>
                <div>
                    <small class="mx-5">Move: WASD or Arrow Keys</small>
                    <small class="mx-5">Look: MOUSE</small>
                    <small class="mx-5">Exit: ESC</small>
                </div>

            </v-row>

        </div>
    </div>

</div>
</template>

<script>
let THREE = null;
if (process.client) {
    THREE = require("three");
}
export default {
    props: {
        nfts: {
            type: Array,
            required: true
        },
        full: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {

        };
    },
    computed: {
        fullmode() {
            return this.$store.state.three.fullmode
        },
    },
    async mounted() {
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            500
        )
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        //x-y-z axes
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors('#ff0000', '#00ff00', '#0000ff')
        // this.scene.add(axesHelper);

        //rendering the view section
        if (this.full == true) {
            renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            renderer.setSize(window.innerWidth / 2.1, window.innerHeight / 1.5);
        }
        this.$refs.canvas.appendChild(renderer.domElement);
        camera.position.set(0, 1, -2);
        camera.lookAt(0, 0.5, 3)

        //pointer lock controls
        let PLC = require("three/examples/jsm/controls/PointerLockControls")
        let controls;

        const objects = [];

        let raycaster,stats;

        let moveForward = false;
        let moveBackward = false;
        let moveLeft = false;
        let moveRight = false;
        let canJump = false;

        let prevTime = performance.now();
        const velocity = new THREE.Vector3();
        const direction = new THREE.Vector3();
        const vertex = new THREE.Vector3();
        const color = new THREE.Color();

        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);
        scene.add(light);
        controls = new PLC.PointerLockControls(camera, renderer.domElement);

        const blocker = document.getElementById('blocker');
        const instructions = document.getElementById('instructions');

        instructions.addEventListener('click', function () {

            controls.lock();

        });

        controls.addEventListener('lock', function () {

            instructions.style.display = 'none';
            // blocker.style.display = 'none';

        });

        controls.addEventListener('unlock', function () {

            // blocker.style.display = 'block';
            instructions.style.display = '';

        });

        scene.add(controls.getObject());

        const onKeyDown = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;

                case 'Space':
                    if (canJump === true) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        const onKeyUp = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('mousemove', onMouseMove);
        //mouse pointing in 3d
        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
        const mouse = new THREE.Vector2(1, 1);

        animatecontrol()
        let x=1
        let z=1

        function animatecontrol() {

            requestAnimationFrame(animatecontrol);

            const time = performance.now();

            if (controls.isLocked === true) {

                raycaster.ray.origin.copy(controls.getObject().position);
                raycaster.ray.origin.y -= 10;

                const intersections = raycaster.intersectObjects(objects, false);

                const onObject = intersections.length > 0;

                const delta = (time - prevTime) / 1000;

                velocity.x -= velocity.x * 10.0 * delta;
                velocity.z -= velocity.z * 10.0 * delta;

                velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                
                direction.normalize(); // this ensures consistent movements in all directions

                if (moveForward || moveBackward) {
                    velocity.z -= direction.z * 50.0 * delta
                    if(moveForward){
                        z++
                    }
                    else{
                        z--
                    }
                }
                if (moveLeft || moveRight) {
                    velocity.x -= direction.x * 50.0 * delta
                    if(moveRight){
                        x++
                    }
                    else{
                        x--
                    }
                    
                }

                if (onObject === true) {

                    velocity.y = Math.max(0, velocity.y);
                    canJump = true;

                }
                if(x < 20 && x >-12){
                controls.moveRight(-velocity.x * delta);
                }
                if(z <50 && z>-5){
                    controls.moveForward(-velocity.z * delta);

                }

            }
            prevTime = time;
            render()
        }

        //loading 3d model
        const modelLoader = require("three/examples/jsm/loaders/GLTFLoader.js");
        const homeloader = await new modelLoader.GLTFLoader();
        homeloader.load(
            "https://res.cloudinary.com/doxa4k3b0/image/upload/v1660887567/Nftsoul/mintcase_kxkrml.glb",
            (gltf) => {
                const model = gltf.scene;
                model.position.set(0, 0, 0)
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error(error);
            }
        );
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        //adding wall image
        var texture = new THREE.TextureLoader().load('https://res.cloudinary.com/doxa4k3b0/image/upload/v1660887447/Nftsoul/wall-banner_fnwdai.png');
        var geometry = new THREE.BoxBufferGeometry(6, 2, 0);
        var material = new THREE.MeshBasicMaterial({
            map: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0.05, 1, -3.05)
        scene.add(mesh);

        //stats
        // const sts=require("three/examples/jsm/libs/stats.module.")
        // stats = new sts.Stats();
		// document.body.appendChild( stats.dom );
        //setting animation loop
        // this.renderer.setAnimationLoop(this.animate);
        //plotting nfts dynamically
        var nfts1 = [{
                img: '',
                position: {
                    x: -0.5,
                    y: 0.95,
                    z: 2.85
                }
            },
            {
                img: '',
                position: {
                    x: 0.88,
                    y: 0.95,
                    z: 2.85
                }
            },
            {
                img: '',
                position: {
                    x: -1.92,
                    y: 0.95,
                    z: 2.85
                }
            }
        ];
        var nfts2 = [{
                img: '',
                position: {
                    x: -2.88,
                    y: 1.12,
                    z: -1.74
                }
            },
            {
                img: '',
                position: {
                    x: -2.88,
                    y: 1.12,
                    z: -0.25
                }
            },
            {
                img: '',
                position: {
                    x: -2.88,
                    y: 1.12,
                    z: 1.25
                }
            }
        ];
        var nfts3 = [{
                img: '',
                position: {
                    x: 2.9,
                    y: 1.18,
                    z: -1.99
                }
            },
            {
                img: '',
                position: {
                    x: 2.9,
                    y: 0.92,
                    z: -0.73
                }
            }
        ];
        var nfts4 = [{
                img: '',
                position: {
                    x: 2,
                    y: 1.31,
                    z: 1.85
                }
            },
            {
                img: '',
                position: {
                    x: 2,
                    y: 1.31,
                    z: 0.85
                }
            },

        ];

        nfts1[0].img = this.nfts[0]
        nfts1[1].img = this.nfts[1]
        nfts1[2].img = this.nfts[2]
        nfts2[0].img = this.nfts[3]
        nfts2[1].img = this.nfts[4]
        nfts2[2].img = this.nfts[5]
        nfts3[1].img = this.nfts[6]
        nfts3[1].img = this.nfts[7]
        nfts4[0].img = this.nfts[8]
        nfts4[1].img = this.nfts[9]

        //first group nfts
        for (var l = 0; l < nfts1.length; l++) {
            var nft = new THREE.TextureLoader().load(nfts1[l].img)
            var nftgeometry = new THREE.BoxBufferGeometry(1, 1, 0);
            var nftmaterial = new THREE.MeshBasicMaterial({
                map: nft
            });
            const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
            nftmesh.position.set(nfts1[l].position.x, nfts1[l].position.y, nfts1[l].position.z)
            scene.add(nftmesh);
        }

        //second group nft
        for (var l = 0; l < nfts2.length; l++) {
            let nft = new THREE.TextureLoader().load(nfts2[l].img)
            let nftgeometry = new THREE.BoxBufferGeometry(1, 1, 0);
            let nftmaterial = new THREE.MeshBasicMaterial({
                map: nft
            });
            const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
            nftmesh.position.set(nfts2[l].position.x, nfts2[l].position.y, nfts2[l].position.z)
            nftmesh.rotation.y = -1.56
            scene.add(nftmesh);
        }

        //third group nft
        for (var l = 0; l < nfts3.length; l++) {
            let nft = new THREE.TextureLoader().load(nfts3[l].img)
            let nftgeometry = new THREE.BoxBufferGeometry(1, 0.8, 0);
            let nftmaterial = new THREE.MeshBasicMaterial({
                map: nft
            });
            const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
            nftmesh.position.set(nfts3[l].position.x, nfts3[l].position.y, nfts3[l].position.z)
            nftmesh.rotation.y = -1.56
            scene.add(nftmesh);
        }

        //forth group nfts
        for (var l = 0; l < nfts4.length; l++) {
            let nft = new THREE.TextureLoader().load(nfts4[l].img)
            let nftgeometry = new THREE.BoxBufferGeometry(0.5, 0.7, 0);
            let nftmaterial = new THREE.MeshBasicMaterial({
                map: nft
            });
            const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
            nftmesh.position.set(nfts4[l].position.x, nfts4[l].position.y, nfts4[l].position.z)
            nftmesh.rotation.y = -1.56
            scene.add(nftmesh);
        }

        //for mouse

        function onMouseMove(event) {

            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        }
        animateMouseEvent()
        function animateMouseEvent() {

            requestAnimationFrame(animateMouseEvent);

            // controls.update();

            raycaster.setFromCamera(mouse, camera);

            const intersection = raycaster.intersectObject(mesh);

            if (intersection.length > 0) {

                const instanceId = intersection[0].instanceId;

                console.log('clicked:',instanceId)

            }

            render();

            // stats.update();

        }
        function render(){
                        renderer.render(scene, camera);
        }

    },
    methods: {
        setPadding() {
            if (this.fullmode == true) {
                return 'pt-16'
            } else {
                return 'pt-2'
            }
        },

    },
};
</script>

<style>
#instructions {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */

    /* text-align: center; */
    font-size: 18px;
    cursor: pointer;
}
</style>
