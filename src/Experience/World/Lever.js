import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Lever {
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

        // lever board
        const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
        this.leverObj = new THREE.Mesh(boxGeometry, boxMaterial)
        this.leverObj.scale.set(width, height, length)
        this.leverObj.castShadow = true
        this.leverObj.position.copy(position)
        // this.leverObj.rotation.x = Math.PI * 0.13
        this.scene.add(this.leverObj)
        
        // pivot obj
        this.pivotObj = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(0.1, 0.1, 20, 1),
            boxMaterial
        )
        this.pivotObj.position.copy({x: 1, y:1.3, z: 1})
        this.pivotObj.castShadow = true
        this.scene.add(this.pivotObj)


        // this.objectsToInteract.push(this.leverObj)

        // physics
        // lever
        this.leverShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, length * 0.5))
        this.leverBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.leverShape
        })
        this.leverBody.position.copy(position)
        this.leverBody.quaternion.copy(this.leverObj.quaternion)
        this.physics.addBody(this.leverBody)

        // pivot
        this.pivotShape = new CANNON.Cylinder(0.1, 0.1, 1, 20)
        this.pivotBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.pivotShape
        })
        this.pivotBody.position.copy({x: 1, y:1.3, z: 1})
        this.pivotBody.quaternion.copy(this.pivotObj.quaternion)
        this.physics.addBody(this.pivotBody)
        
        this.hinge = new CANNON.HingeConstraint(this.leverBody, this.pivotBody, new CANNON.Vec3({x: 1, y: 0, z: 0}))        
        this.physics.addConstraint(this.hinge)

    }

    update(){
        this.leverObj.position.copy(this.leverBody.position)
        this.leverObj.quaternion.copy(this.leverBody.quaternion)
    }

}