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
    
        this.defaultMaterial = this.experience.defaultMaterial
        // this.lowBounceMaterial = new CANNON.ContactMaterial('lowBounce')
        // this.lowBounceContactMaterial = new CANNON.ContactMaterial(
        //     this.defaultMaterial,
        //     this.lowBounceMaterial,
        //     {
        //         friction: 0.1,
        //         restitution: 0.3
        //     }
        // )
        // this.physics.addContactMaterial(this.lowBounceContactMaterial)
    }
    
    setGeometry(){
        this.boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
    }

    setMaterial(){
        this.boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture,
            color: '#deb671'
        })
    }

    createBasicRamp(width, height, length, position){
  
        this.setGeometry()
        this.setMaterial()
        this.rampObj = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.rampObj.scale.set(width, height, length)
        this.rampObj.castShadow = true
        this.rampObj.position.copy(position)
        this.rampObj.rotation.x = Math.PI * 0.13
        this.scene.add(this.rampObj)

        // physics
        this.rampShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, length * 0.5))
        this.rampBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.rampShape,
        })
        this.rampBody.position.copy(position)
        this.rampBody.quaternion.copy(this.rampObj.quaternion)
        this.physics.addBody(this.rampBody)

    }

    createWalledRamp(width, height, length, position, xRot, yRot, zRot){
        const wallHeight = height * 1.5
        this.setGeometry()
        this.setMaterial()
        this.wallRamp = new THREE.Group
        // Base
        this.rampBaseObj = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.rampWallObjL = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.rampWallObjR = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.rampBaseObj.scale.set(width, height, length)
        this.rampWallObjL.scale.set(width * 0.2, wallHeight, length)
        this.rampWallObjL.position.copy({x: width / 2 - width * 0.1, y: wallHeight / 2 + height /2 , z: 0})
        this.rampWallObjR.scale.set(width * 0.2, wallHeight, length)
        this.rampWallObjR.position.copy({x:  - width / 2 + width * 0.1, y: wallHeight / 2 + height/ 2, z: 0})
        this.wallRamp.add(this.rampBaseObj)
        this.wallRamp.add(this.rampWallObjL)
        this.wallRamp.add(this.rampWallObjR)
        this.wallRamp.position.copy({...position})
        this.wallRamp.castShadow = true
        this.wallRamp.rotation.reorder('YXZ')
        if(yRot){
            this.wallRamp.rotation.y = Math.PI * yRot
        }
        if(xRot){
            this.wallRamp.rotation.x =  Math.PI * xRot
        }
        if(zRot){
            this.wallRamp.rotation.z = Math.PI * zRot
        }

        this.scene.add(this.wallRamp)

        // physics
        // base
        this.rampShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, length * 0.5))
        this.rampWallLShape = new CANNON.Box(new CANNON.Vec3(width * 0.1, wallHeight/2, length * 0.5))
        this.rampWallRShape = new CANNON.Box(new CANNON.Vec3(width * 0.1, wallHeight/2, length * 0.5))
        
        this.rampBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0,0,0),
            shape: this.rampShape,
        })
        this.rampWallLBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(width / 2 - width * 0.1, height, 0),
            shape: this.rampWallLShape,
        })
        this.rampWallRBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(- width / 2 + width * 0.1, height, 0),
            shape: this.rampWallRShape,
        })


        this.rampBody.addShape(this.rampShape)
        this.rampBody.addShape(this.rampWallLShape, new CANNON.Vec3(width / 2 - width * 0.1, wallHeight / 2 + height /2, 0))
        this.rampBody.addShape(this.rampWallRShape, new CANNON.Vec3(- width / 2 + width * 0.1, wallHeight / 2 + height /2, 0))

        this.rampBody.position.copy(position)
        this.rampBody.quaternion.copy(this.wallRamp.quaternion)
        this.physics.addBody(this.rampBody)

        // this.rampWallRBody.position.copy(position)
        // this.rampWallRBody.quaternion.copy(this.rampWallObjR.quaternion)
        // this.physics.addBody(this.rampWallRBody)

        // this.rampWallLBody.position.copy(position)
        // this.rampWallLBody.quaternion.copy(this.rampWallObjL.quaternion)
        // this.physics.addBody(this.rampWallLBody)
        return this.wallRamp
    }

}