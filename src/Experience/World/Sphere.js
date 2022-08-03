import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Sphere {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.debug = this.experience.debug

        this.objectsToUpdate = []

        // debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Sphere')
            const debugObject = {}
            debugObject.createSphere = () => {
                    this.createSphere(
                        Math.random() * 0.5, 
                        {
                            x: (Math.random() - 0.5) * 3,
                            y: 3,
                            z: (Math.random() - 0.5) * 3,
                        })
                }
            this.debugFolder.add(debugObject, 'createSphere')
        }

    }

    setGeometry(){
        this.geometry = new THREE.SphereBufferGeometry(1, 20, 20)
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
    }

    setMesh(radius){       
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.set(radius, radius, radius)
        this.mesh.receiveShadow = true
        // this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }

    createSphere(radius, position){
        this.setGeometry()
        this.setMaterial()
        this.setMesh(radius)

        this.shape = new CANNON.Sphere(radius)
        this.sphereBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0,3,0),
            shape: this.shape
        })
        this.sphereBody.position.copy(position)
        this.physics.addBody(this.sphereBody)
        this.objectsToUpdate.push({
            mesh: this.mesh,
            body: this.sphereBody
        })


    }
    
    update(){
    // this.experience.physics.step(1/60, this.experience.time.delta, 3)
    for(const object of this.objectsToUpdate){
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }
    }
}