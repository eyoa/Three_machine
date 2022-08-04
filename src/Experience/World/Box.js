import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Box {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.debug = this.experience.debug
        this.objectsToUpdate = this.experience.objectsToUpdate

        // debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Box')
            const debugObject = {}
            debugObject.createBox = () => {
                this.createBox(
                    Math.random(),
                    Math.random(),
                    Math.random(), 
                    {
                        x: (Math.random() - 0.5) * 3,
                        y: 3,
                        z: (Math.random() - 0.5) * 3,
                    })
                }
            this.debugFolder.add(debugObject, 'createBox')
        }

    }

    setGeometry(){
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
    }

    setMesh(width, height, depth, position){       
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.set(width, height, depth)
        this.mesh.receiveShadow = true
        this.mesh.position.copy(position)
        this.scene.add(this.mesh)
    }

    createBox(width, height, depth, position){
        this.setGeometry()
        this.setMaterial()
        this.setMesh(width, height, depth, position)

        this.boxShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
        this.boxBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0,3,0),
            shape: this.boxShape
        })
        this.boxBody.position.copy(position)
        this.physics.addBody(this.boxBody)
        this.objectsToUpdate.push({
            mesh: this.mesh,
            body: this.boxBody
        })


    }
    
    update(){
    }
}