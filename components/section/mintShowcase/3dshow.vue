<template>
<div>
    <div ref="canvas"></div>
</div>
</template>

<script>
let THREE = null;
let ComboControls=null
if (process.client) {
    ComboControls=require("@cognite/three-combo-controls")
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

            ]
        };
    },
    async mounted() {
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors('#ff0000', '#00ff00', '#0000ff')
        this.scene.add(axesHelper);

        //rendering the view section
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.canvas.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 1, -1);
        this.camera.lookAt(0, 0.5, 3)

        // let OC=require("three/examples/jsm/controls/OrbitControls")
        // let orbit=new OC.OrbitControls(this.camera,this.renderer.domElement)
        // orbit.update()

        // to move object freely using mouse and to zoom in and zoom out
        let fpcntrl = require("three/examples/jsm/controls/FirstPersonControls");
        var fpc = new fpcntrl.FirstPersonControls(this.camera, this.renderer.domElement);
        console.log('ok:', fpc)
        fpc.enabled = true;
        fpc.activeLook = true
        fpc.lookVertical = false
        fpc.constrainVertical = false
        fpc.verticalMin = Math.PI / 1.7
        fpc.verticalMax = Math.PI / 2.3
        fpc.movementSpeed = 0.1
        fpc.lookSpeed = 0.005

        console.log('control:', fpc)

        function animate() {
            requestAnimationFrame(animate)
            fpc.update(0.1)
        }
        animate()
        // const controls = ComboControls(this.camera, this.renderer.domElement);
        // const clock = new THREE.Clock();

        // function animate() {
        //     controls.update(clock.getDelta());
        //     // ...
        // }
        // animate()
        // console.log('ctrl:',ComboControls)

        // 3d models
        const modelLoader = require("three/examples/jsm/loaders/GLTFLoader.js");
        const homeloader = await new modelLoader.GLTFLoader();
        homeloader.load(
            "models/new.glb",
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
        //adding wall image
        var texture = new THREE.TextureLoader().load('images/wall-banner.png');
        var geometry = new THREE.BoxBufferGeometry(6, 2, 0);
        var material = new THREE.MeshBasicMaterial({
            map: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0.05, 1, -3.05)
        this.scene.add(mesh);

        this.addFirstNftGroup()
        this.addSecondNftGroup()
        this.addThirdNftGroup()
        this.addForthNftGroup()

        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(ambientLight);

        //setting animation loop
        this.renderer.setAnimationLoop(this.animate);

    },
    methods: {
        animate() {
            this.renderer.render(this.scene, this.camera);
        },
        addFirstNftGroup() {
            for (var l = 0; l < this.nfts1.length; l++) {
                var nft = new THREE.TextureLoader().load('images/nft.jpg')
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
                let nft = new THREE.TextureLoader().load('images/nft.jpg')
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
                let nft = new THREE.TextureLoader().load('images/nft.jpg')
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
                let nft = new THREE.TextureLoader().load('images/nft.jpg')
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
