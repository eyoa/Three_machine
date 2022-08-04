import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Ramp {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.cursor = this.experience.cursor
        this.raycaster = this.experience.raycaster
    
    }

    init(){
        const width = 2
        const height = 0.3
        const length = 5
        const position = {x: 1, y:1.5, z: 1}


        const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
        this.rampObj = new THREE.Mesh(boxGeometry, boxMaterial)
        this.rampObj.scale.set(width, height, length)
        this.rampObj.castShadow = true
        this.rampObj.position.copy(position)
        this.rampObj.rotation.x = Math.PI * 0.13
        this.scene.add(this.rampObj)

        // this.objectsToInteract.push(this.rampObj)

        // physics
        this.rampShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, length * 0.5))
        this.rampBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.rampShape
        })
        this.rampBody.position.copy(position)
        this.rampBody.quaternion.copy(this.rampObj.quaternion)
        this.physics.addBody(this.rampBody)
        //       this.objectsToUpdate.push({
        //     mesh: this.mesh,
        //     body: this.boxBody
        // })


    }

}