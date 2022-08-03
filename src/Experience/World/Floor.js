import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Floor{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resouces = this.experience.resources
        this.physics = this.experience.physics

        this.setGeomery()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPhysics()
    }

    setGeomery(){
        this.geometry = new THREE.PlaneGeometry(10, 10)
    }

    setTextures(){
        this.textures = {}
        this.textures.color = this.resouces.items.environmentMapTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        
        // this.textures.color = this.resouces.items.grassColorTexture
        // this.textures.color.encoding = THREE.sRGBEncoding
        // this.textures.color.repeat.set(1.5, 1.5)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping
        
        // this.textures.color = this.resouces.items.grassNormalTexture
        // this.textures.color.repeat.set(1.5, 1.5)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping

    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            color: '#777777',
            metalness: 0.3,
            roughness: 0.4,
            envMap: this.textures.color,
            envMapIntensity: 0.5
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }

    setPhysics(){
        this.floorShape = new CANNON.Plane()
        this.floorBody = new CANNON.Body()
        this.floorBody.mass = 0
        this.floorBody.addShape(this.floorShape)
        this.floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI * 0.5
        )
        this.physics.addBody(this.floorBody)
    }
}