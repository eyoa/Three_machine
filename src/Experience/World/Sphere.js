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

        this.objectsToUpdate = this.experience.objectsToUpdate

        // debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Sphere')
            const debugObject = {}
            debugObject.createSphere = () => {
                    // this.createSphere(
                    //     Math.random() * 0.5, 
                    //     {
                    //         x: (Math.random() - 0.5) * 3,
                    //         y: 5,
                    //         z: (Math.random() - 0.5) * 3,
                    //     })
                    this.createSphere(
                        0.3, 
                        {
                            x: -2,
                            y: 6,
                            z: 1,
                        })
                }
            
            debugObject.showAxis = () => {
                const axisHelper = new THREE.AxesHelper(5)
                this.scene.add(axisHelper)
            }
            
            this.debugFolder.add(debugObject, 'createSphere')
            this.debugFolder.add(debugObject, 'showAxis')
        }

    }

    setGeometry(){
        this.geometry = new THREE.SphereBufferGeometry(1, 20, 20)
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            metalness: 0.8,
            roughness: 0.4,
            color: '#ffffff',
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
    }
}