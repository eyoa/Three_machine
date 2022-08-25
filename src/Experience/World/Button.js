import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Button {
    constructor(){
        console.log('button made')
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.objectsToInteract = this.experience.objectsToInteract
        this.cursor = this.experience.cursor
        this.raycaster = this.experience.raycaster

        this.init()
    
    }

    init(){
        const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
        this.buttonObj = new THREE.Mesh(boxGeometry, boxMaterial)
        this.buttonObj.scale.set(1, 0.2, 1)
        this.buttonObj.castShadow = true
        this.buttonObj.position.copy({x: 3, y:0.1, z: 2})
        this.scene.add(this.buttonObj)

        this.objectsToInteract.push(this.buttonObj)

        // physics
        this.btnShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.2 * 0.5, 0.5))
        this.btnBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.btnShape
        })
        this.btnBody.position.copy({x: 3, y:0.1, z: 2})
        this.physics.addBody(this.btnBody)

        // events
        this.cursor.on('click', () => {
            if (this.experience.raycaster.currentIntersect.object === this.buttonObj){
                this.experience.world.sphere.createSphere(0.3, {x: 0 , y:20, z: -2})        
                // this.experience.world.sphere.createSphere(
                //     Math.random() * 0.5, 
                //     {
                //         x: (Math.random() - 0.5) * 3,
                //         y: 3,
                //         z: (Math.random() - 0.5) * 3,
                //     })
            }
        })

        this.raycaster.on('hover', (intersectObject) => {
            if (intersectObject && intersectObject.object === this.buttonObj){
                this.buttonObj.material.color.set('#00ff00')
            }
        })

        this.raycaster.on('leave', (intersectObject) => {
            if (intersectObject && intersectObject.object === this.buttonObj){
                this.buttonObj.material.color.set('#777777')
            }
        
        })
    }

}