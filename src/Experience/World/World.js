import Experience from "../experience";
import * as THREE from 'three'
import Environment from "./Environment";


export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene

        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),   
            new THREE.MeshStandardMaterial()
        )
        this.scene.add(testMesh)
        
        // Setup
        this.environment = new Environment()

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