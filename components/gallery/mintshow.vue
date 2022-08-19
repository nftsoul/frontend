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
        };
    },
    async mounted() {
        //x-y-z axes
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors('#ff0000', '#00ff00', '#0000ff')
        // this.scene.add(axesHelper);

        //rendering the view section
        if (this.full == true) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.renderer.setSize(window.innerWidth / 2.1, window.innerHeight / 1.5);
        }
        this.$refs.canvas.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 1, -2);
        this.camera.lookAt(0, 0.5, 3)

        //control
        // let OC = require("three/examples/jsm/controls/OrbitControls")
        // let orbit = new OC.OrbitControls(this.camera, this.renderer.domElement)
        // orbit.update()
        let fpcntrl = require("three/examples/jsm/controls/FirstPersonControls");
        var fpc = new fpcntrl.FirstPersonControls(this.camera, this.renderer.domElement);
        
        fpc.enabled = true;
        fpc.activeLook = true
        fpc.lookVertical = false
        fpc.constrainVertical = false
        fpc.verticalMin = Math.PI / 1.7
        fpc.verticalMax = Math.PI / 2.3
        fpc.movementSpeed = 0.1
        fpc.lookSpeed = 0.005

        function animate() {
            requestAnimationFrame(animate)
            fpc.update(0.3)
        }
        animate()

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
