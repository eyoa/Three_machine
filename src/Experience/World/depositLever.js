import Experience from "../experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class depositLever {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.physics = this.experience.physics
        this.cursor = this.experience.cursor
        this.raycaster = this.experience.raycaster
    
    }

    init(width, height, length, position){
        let pivotPosition = {...position}
        pivotPosition.y = pivotPosition.y - 0.2
        // lever board
        const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4, 
            envMap: this.resources.items.environmentMapTexture
        })
        this.depositLeverObj = new THREE.Mesh(boxGeometry, boxMaterial)
        this.depositLeverObj.scale.set(width, height, length)
        this.depositLeverObj.castShadow = true
        this.depositLeverObj.position.copy(position)
        this.scene.add(this.depositLeverObj)

        const cupWidth = 2
        const cupHeight = 0.2
        const cupLength = 2
        const cupPosition = {...position}
        cupPosition.z = cupPosition.z + 5
        
        const cupWallLPos = {...position}
        cupWallLPos.z = cupWallLPos.z + 5
        cupWallLPos.x = cupWallLPos.x - cupWidth / 2 + cupHeight / 2
        cupWallLPos.y = cupWallLPos.y + cupWidth /2 - cupHeight / 2 
        
        const cupWallRPos = {...position}
        cupWallRPos.z = cupWallRPos.z + 5
        cupWallRPos.x = cupWallRPos.x + cupWidth / 2 - cupHeight / 2
        cupWallRPos.y = cupWallRPos.y + cupWidth /2 - cupHeight / 2 
        
        const cupWallTopPos = {...position}
        cupWallTopPos.z = cupWallTopPos.z + 5 - cupWidth /2 
        cupWallTopPos.y = cupWallTopPos.y + cupWidth /2 - cupHeight / 2 

        const cupWallBotPos = {...position}
        cupWallBotPos.z = cupWallBotPos.z + 5 + cupWidth /2 
        cupWallBotPos.y = cupWallBotPos.y + cupWidth /2 - cupHeight / 2 

        // cup1
        this.cup1 = new THREE.Group
        const cup1mesh = new THREE.Mesh(boxGeometry, boxMaterial)
        cup1mesh.scale.set(cupWidth, cupHeight, cupLength)
        cup1mesh.position.copy(cupPosition)
        this.cup1.add(cup1mesh)

        const cup1wallLmesh = new THREE.Mesh(boxGeometry, boxMaterial)
        cup1wallLmesh.scale.set(cupWidth, cupHeight, cupLength)
        cup1wallLmesh.position.copy(cupWallLPos)
        cup1wallLmesh.rotation.z = Math.PI * 0.5
        this.cup1.add(cup1wallLmesh)

        const cup1wallRmesh = new THREE.Mesh(boxGeometry, boxMaterial)
        cup1wallRmesh.scale.set(cupWidth, cupHeight, cupLength)
        cup1wallRmesh.position.copy(cupWallRPos)
        cup1wallRmesh.rotation.z = Math.PI * 0.5
        this.cup1.add(cup1wallRmesh)

        const cup1wallTopmesh = new THREE.Mesh(boxGeometry, boxMaterial)
        cup1wallTopmesh.scale.set(cupWidth, cupHeight, cupLength)
        cup1wallTopmesh.position.copy(cupWallTopPos)
        cup1wallTopmesh.rotation.x = Math.PI * 0.5
        this.cup1.add(cup1wallTopmesh)

        const cup1wallBotmesh = new THREE.Mesh(boxGeometry, boxMaterial)
        cup1wallBotmesh.scale.set(cupWidth, cupHeight, cupLength)
        cup1wallBotmesh.position.copy(cupWallBotPos)
        cup1wallBotmesh.rotation.x = Math.PI * 0.5
        this.cup1.add(cup1wallBotmesh)

        this.scene.add(this.cup1)

        this.test = CannonUtils.CreateTrimesh((this.cup1.Mesh.geometry))

        // cup2

        
        // pivot obj
        this.pivotObj = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(0.1, 0.1, 20, 1),
            boxMaterial
        )
        this.pivotObj.position.copy(pivotPosition)
        this.pivotObj.castShadow = true
        // this.scene.add(this.pivotObj)

        // physics
        // lever
        this.depositLeverShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, length * 0.5))
        this.depositLeverBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.depositLeverShape
        })
        this.depositLeverBody.position.copy(position)
        this.depositLeverBody.quaternion.copy(this.depositLeverObj.quaternion)
        this.physics.addBody(this.depositLeverBody)

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
        
        this.hinge = new CANNON.HingeConstraint(this.depositLeverBody, this.pivotBody, new CANNON.Vec3({x: -1, y: 0, z: 0}))        
        this.physics.addConstraint(this.hinge)

    }

    update(){
        if(this.depositLeverObj){
            this.depositLeverObj.position.copy(this.depositLeverBody.position)
            this.depositLeverObj.quaternion.copy(this.depositLeverBody.quaternion)
        }
    }

}