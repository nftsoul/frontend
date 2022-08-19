<template>
<div>
    <div ref="canvas">
        <div id="instruct"></div>
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
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.1,
                500
            ),
            renderer: new THREE.WebGLRenderer({
                antialias: true
            }),
            nfts1: [{
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
            ],
            nfts2: [{
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
            ],
            nfts3: [{
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
            ],
            nfts4: [{
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

            ],
            // pointer lock
            controls: null,
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false,
            canJump: false,

            prevTime: null,
            velocity: null,
            direction: null,
            vertex: null,
            color: null,
            raycaster: null
        };
    },
    async mounted() {
        //x-y-z axes
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors('#ff0000', '#00ff00', '#0000ff')
        this.scene.add(axesHelper);
        this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

        //rendering the view section
        if (this.full == true) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.renderer.setSize(window.innerWidth / 2.1, window.innerHeight / 1.5);
        }
        this.$refs.canvas.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 1, -2);
        this.camera.lookAt(0, 5, 5)

        //control
        // let OC = require("three/examples/jsm/controls/OrbitControls")
        // let orbit = new OC.OrbitControls(this.camera, this.renderer.domElement)
        // orbit.update()
        let OC = require("three/examples/jsm/controls/PointerLockControls")
        this.controls = new OC.PointerLockControls(this.camera, this.renderer.domElement);
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        this.prevTime = performance.now();
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.vertex = new THREE.Vector3();
        this.color = new THREE.Color()

        //init pointer 
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);
        this.scene.add(light);

        const instructions = document.getElementById('instruct');

        instructions.addEventListener('click', function () {

            this.controls.lock();

        });

        this.controls.addEventListener('lock', function () {

            instructions.style.display = 'none';
            blocker.style.display = 'none';

        });

        this.controls.addEventListener('unlock', function () {

            // blocker.style.display = 'block';
            instructions.style.display = '';

        });

        this.scene.add(this.controls.getObject());

        const onKeyDown = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    break;

                case 'Space':
                    if (this.canJump === true) velocity.y += 350;
                    this.canJump = false;
                    break;

            }

        };

        const onKeyUp = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

        // floor

        let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        floorGeometry.rotateX(-Math.PI / 2);

        // vertex displacement

        this.position = floorGeometry.attributes.position;

        for (let i = 0, l = this.position.count; i < l; i++) {

            this.vertex.fromBufferAttribute(this.position, i);

            this.vertex.x += Math.random() * 20 - 10;
            this.vertex.y += Math.random() * 2;
            this.vertex.z += Math.random() * 20 - 10;

            this.position.setXYZ(i, this.vertex.x, this.vertex.y, this.vertex.z);

        }

        floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

        this.position = floorGeometry.attributes.position;
        const colorsFloor = [];

        for (let i = 0, l = this.position.count; i < l; i++) {

            this.color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            colorsFloor.push(this.color.r, this.color.g,this.color.b);

        }

        floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));

        const floorMaterial = new THREE.MeshBasicMaterial({
            vertexColors: true
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.scene.add(floor);

        this.pointerAnimate()

        //adding wall image
        var texture = new THREE.TextureLoader().load('https://res.cloudinary.com/doxa4k3b0/image/upload/v1660887447/Nftsoul/wall-banner_fnwdai.png');
        var geometry = new THREE.BoxBufferGeometry(6, 2, 0);
        var material = new THREE.MeshBasicMaterial({
            map: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0.05, 1, -3.05)
        this.scene.add(mesh);
        this.plotNfts()
        this.addLight()
        this.load3DModel()
        this.addFirstNftGroup()
        this.addSecondNftGroup()
        this.addThirdNftGroup()
        this.addForthNftGroup()

        //setting animation loop
        this.renderer.setAnimationLoop(this.animate);

    },
    methods: {
        pointerAnimate() {
            requestAnimationFrame(this.pointerAnimate);

            const time = performance.now();

            if (this.controls.isLocked === true) {

                this.raycaster.ray.origin.copy(this.controls.getObject().position);
                this.raycaster.ray.origin.y -= 10;

                const intersections = raycaster.intersectObjects(objects, false);

                const onObject = intersections.length > 0;

                const delta = (time - prevTime) / 1000;

                this.velocity.x -= velocity.x * 10.0 * delta;
                this.velocity.z -= velocity.z * 10.0 * delta;

                this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

                this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
                this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
                this.direction.normalize(); // this ensures consistent movements in all directions

                if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
                if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;

                if (onObject === true) {

                    this.velocity.y = Math.max(0, this.velocity.y);
                    this.canJump = true;

                }

                this.controls.moveRight(-this.velocity.x * delta);
                this.controls.moveForward(-this.velocity.z * delta);

                this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

                if (this.controls.getObject().position.y < 10) {

                    this.velocity.y = 0;
                    this.controls.getObject().position.y = 10;

                    this.canJump = true;

                }

            }
            this.prevTime = time;
        },
        plotNfts() {
            this.nfts1[0].img = this.nfts[0]
            this.nfts1[1].img = this.nfts[1]
            this.nfts1[2].img = this.nfts[2]
            this.nfts2[0].img = this.nfts[3]
            this.nfts2[1].img = this.nfts[4]
            this.nfts2[2].img = this.nfts[5]
            this.nfts3[1].img = this.nfts[6]
            this.nfts3[1].img = this.nfts[7]
            this.nfts4[0].img = this.nfts[8]
            this.nfts4[1].img = this.nfts[9]
        },
        async load3DModel() {
            const modelLoader = require("three/examples/jsm/loaders/GLTFLoader.js");
            const homeloader = await new modelLoader.GLTFLoader();
            homeloader.load(
                "https://res.cloudinary.com/doxa4k3b0/image/upload/v1660887567/Nftsoul/mintcase_kxkrml.glb",
                (gltf) => {
                    const model = gltf.scene;
                    model.position.set(0, 0, 0)
                    this.scene.add(model);
                },
                undefined,
                (error) => {
                    console.error(error);
                }
            );
        },
        addLight() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 2);
            this.scene.add(ambientLight);
        },
        animate() {
            this.renderer.render(this.scene, this.camera);
        },
        addFirstNftGroup() {
            for (var l = 0; l < this.nfts1.length; l++) {
                var nft = new THREE.TextureLoader().load(this.nfts1[l].img)
                var nftgeometry = new THREE.BoxBufferGeometry(1, 1, 0);
                var nftmaterial = new THREE.MeshBasicMaterial({
                    map: nft
                });
                const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
                nftmesh.position.set(this.nfts1[l].position.x, this.nfts1[l].position.y, this.nfts1[l].position.z)
                this.scene.add(nftmesh);
            }
        },
        addSecondNftGroup() {
            for (var l = 0; l < this.nfts2.length; l++) {
                let nft = new THREE.TextureLoader().load(this.nfts2[l].img)
                let nftgeometry = new THREE.BoxBufferGeometry(1, 1, 0);
                let nftmaterial = new THREE.MeshBasicMaterial({
                    map: nft
                });
                const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
                nftmesh.position.set(this.nfts2[l].position.x, this.nfts2[l].position.y, this.nfts2[l].position.z)
                nftmesh.rotation.y = -1.56
                this.scene.add(nftmesh);
            }
        },

        addThirdNftGroup() {
            for (var l = 0; l < this.nfts3.length; l++) {
                let nft = new THREE.TextureLoader().load(this.nfts3[l].img)
                let nftgeometry = new THREE.BoxBufferGeometry(1, 0.8, 0);
                let nftmaterial = new THREE.MeshBasicMaterial({
                    map: nft
                });
                const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
                nftmesh.position.set(this.nfts3[l].position.x, this.nfts3[l].position.y, this.nfts3[l].position.z)
                nftmesh.rotation.y = -1.56
                this.scene.add(nftmesh);
            }
        },
        addForthNftGroup() {
            for (var l = 0; l < this.nfts4.length; l++) {
                let nft = new THREE.TextureLoader().load(this.nfts4[l].img)
                let nftgeometry = new THREE.BoxBufferGeometry(0.5, 0.7, 0);
                let nftmaterial = new THREE.MeshBasicMaterial({
                    map: nft
                });
                const nftmesh = new THREE.Mesh(nftgeometry, nftmaterial);
                nftmesh.position.set(this.nfts4[l].position.x, this.nfts4[l].position.y, this.nfts4[l].position.z)
                nftmesh.rotation.y = -1.56
                this.scene.add(nftmesh);
            }
        }

    },
};
</script>
