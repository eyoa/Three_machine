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

        this.objectsToUpdate = this.experience.objectsToUpdate
    
    }

    init(width, height, length, position, yRot){
        let pivotPosition = {...position}
        pivotPosition.y = pivotPosition.y - 0.2
        // lever board
        const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            color: '#f7ee83',
            envMap: this.resources.items.environmentMapTexture
        })
        this.leverObj = new THREE.Mesh(boxGeometry, boxMaterial)
        this.leverObj.scale.set(width, height, length)
        this.leverObj.castShadow = true
        this.leverObj.rotation.reorder('YXZ')
        if(yRot){
            this.leverObj.rotation.y = Math.PI * 0.5
        }
        this.leverObj.position.copy(position)
        this.scene.add(this.leverObj)
        
        // pivot obj
        this.pivotObj = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(0.1, 0.1, 20, 1),
            boxMaterial
        )
        this.pivotObj.position.copy(pivotPosition)
        this.pivotObj.rotation.x = Math.PI * 0.5
        this.pivotObj.castShadow = true
        this.scene.add(this.pivotObj)

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
        this.pivotBody.position.copy(this.pivotObj.position)
        this.pivotBody.quaternion.copy(this.pivotObj.quaternion)
        this.physics.addBody(this.pivotBody)
        
        this.hinge = new CANNON.HingeConstraint(this.pivotBody, this.leverBody, {axisA: new CANNON.Vec3({x: 0, y: 1, z: 0})})        
        this.physics.addConstraint(this.hinge)
        
        this.objectsToUpdate.push({
            mesh: this.leverObj,
            body: this.leverBody
        })
    }

    update(){
        // if(this.leverObj){
        //     this.leverObj.position.copy(this.leverBody.position)
        //     this.leverObj.quaternion.copy(this.leverBody.quaternion)
        // }
    }

}