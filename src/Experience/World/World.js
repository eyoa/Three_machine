import Experience from "../experience";
import * as THREE from 'three'
import Environment from "./Environment";
import Floor from "./Floor";


export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            console.log('everything is loaded')
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
        })

        // const textureLoader = new THREE.TextureLoader()
        // const cubeTextureLoader = new THREE.CubeTextureLoader()

        // const environmentMapTexture = cubeTextureLoader.load([
        //     '/textures/environmentMaps/0/px.png',
        // ])

        // const floor = new THREE.Mesh(
        //     new THREE.PlaneGeometry(10, 10),
        //     new THREE.MeshStandardMaterial({
        //         color: '#777777',
        //         metalness: 0.3,
        //         roughness: 0.4,
        //         envMap: environmentMapTexture,
        //         envMapIntensity: 0.5
        //     })
        // )
        // floor.receiveShadow = true
        // floor.rotation.x = - Math.PI * 0.5
        // this.scene.add(floor)
    }
}