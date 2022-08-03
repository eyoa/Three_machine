import './style.css'
import Experience from './Experience/experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))


// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
// import * as CANNON from 'cannon-es'

// /**
//  * Debug
//  */
// const gui = new dat.GUI()
// const debugObject = {}
// debugObject.createSphere = () => {
//     createSphere(
//         Math.random() * 0.5, 
//         {
//             x: (Math.random() - 0.5) * 3,
//             y: 3,
//             z: (Math.random() - 0.5) * 3,
//         })
// }
// debugObject.createBox = () => {
//     createBox(
//         Math.random(),
//         Math.random(),
//         Math.random(), 
//         {
//             x: (Math.random() - 0.5) * 3,
//             y: 3,
//             z: (Math.random() - 0.5) * 3,
//         })
// }
// debugObject.reset = () => {
//     for (const object of objectsToUpdate){
//         // Remove Body
//         object.body.removeEventListener('collide', playHitSound)
//         world.removeBody(object.body)
//         // Remove Mesh
//         scene.remove(object.mesh)
//     }
//     objectsToUpdate = []
// }
// gui.add(debugObject, 'createSphere')
// gui.add(debugObject, 'createBox')
// gui.add(debugObject, 'reset')


// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Sounds
//  */

// const hitSound = new Audio('/sounds/hit.mp3')

// const playHitSound = (collision) => {
//     const impactStrength = collision.contact.getImpactVelocityAlongNormal()
//     if (impactStrength > 1.5 ){ 
//         hitSound.volume = Math.min(Math.max(impactStrength, 0), 1) * 0.5
//         hitSound.currentTime = 0
//         hitSound.play()
//     }
// }



// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const environmentMapTexture = cubeTextureLoader.load([
//     '/textures/environmentMaps/0/px.png',

// ])

// /**
//  * Physics
//  */
// // world
// const world = new CANNON.World()
// world.broadphase = new CANNON.SAPBroadphase(world)
// world.allowSleep = true
// world.gravity.set(0, -9.82, 0)

// // Materials
// const defaultMaterial = new CANNON.Material('default')

// const defaultContactMaterial = new CANNON.ContactMaterial(
//     defaultMaterial,
//     defaultMaterial,
//     {
//         friction: 0.1,
//         restitution: 0.7
//     }
// )
// world.addContactMaterial(defaultContactMaterial)
// world.defaultContactMaterial = defaultContactMaterial


// // Floor
// const floorShape = new CANNON.Plane()
// const floorBody = new CANNON.Body()
// floorBody.mass = 0
// floorBody.addShape(floorShape)
// floorBody.quaternion.setFromAxisAngle(
//     new CANNON.Vec3(- 1, 0, 0), 
//     Math.PI * 0.5
// )
// world.addBody(floorBody)




// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#777777',
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Cursor
//  */
// const mouse = new THREE.Vector2()
// window.addEventListener('mousemove', (event) => {
//     mouse.x = event.clientX /sizes.width * 2 - 1
//     mouse.y = - (event.clientY /sizes.height * 2) + 1
// })

// window.addEventListener('click', () => {
//     if (currentIntersect){
//         switch(currentIntersect.object){
//             case buttonObj:
//                 createBox(
//                     Math.random(),
//                     Math.random(),
//                     Math.random(), 
//                     {
//                         x: (Math.random() - 0.5) * 3,
//                         y: 3,
//                         z: (Math.random() - 0.5) * 3,
//                     })
//                 break
//         }

//     }
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(- 3, 3, 3)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// /**
//  * Utils
//  */
// let objectsToUpdate = []

// // sphere
// const sphereGeometry =  new THREE.SphereBufferGeometry(1, 20, 20)
// const sphereMaterial = new THREE.MeshStandardMaterial({
    // metalness: 0.3,
    // roughness: 0.4, 
    // envMap: environmentMapTexture
// })

// const createSphere = (radius, position) => {
//     // mesh
//     const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
//     mesh.scale.set(radius, radius, radius)
//     mesh.castShadow = true
//     mesh.position.copy(position)
//     scene.add(mesh)

//     // physics body
//     const shape = new CANNON.Sphere(radius)
//     const body = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(0,3,0),
//         shape,
//     })
//     body.position.copy(position)
//     body.addEventListener('collide', playHitSound)
//     world.addBody(body)

//     // save in objects to update
//     objectsToUpdate.push({
//         mesh,
//         body
//     })
// }

// // box
// const boxGeometry =  new THREE.BoxBufferGeometry(1, 1, 1)
// const boxMaterial = new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4, 
//     envMap: environmentMapTexture
// })

// const createBox = (width, height, depth, position) => {
//     // mesh
//     const mesh = new THREE.Mesh(boxGeometry, boxMaterial)

//     mesh.scale.set(width, height, depth)
//     mesh.castShadow = true
//     mesh.position.copy(position)
//     scene.add(mesh)

//     // physics body
//     const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
//     const body = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(0,3,0),
//         shape,
//     })
//     body.position.copy(position)
//     body.addEventListener('collide', playHitSound)
//     world.addBody(body)

//     // save in objects to update
//     objectsToUpdate.push({
//         mesh,
//         body
//     })
// }



// // initial scene
// createSphere(0.5, {x: 0, y: 3, z: 2})

// /**
//  * Button
//  */
// // mesh
// const buttonObj = new THREE.Mesh(boxGeometry, boxMaterial)

// buttonObj.scale.set(1, 0.2, 1)
// buttonObj.castShadow = true
// buttonObj.position.copy({x: 2, y: 0, z: 0})
// scene.add(buttonObj)

// // physics body
// const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.2 * 0.5, 0.5))
// const body = new CANNON.Body({
//     mass: 1,
//     position: new CANNON.Vec3(2,0,0),
//     shape,
// })
// body.position.copy({x: 2, y: 0, z: 0})
// world.addBody(body)



// /**
//  * Raycaster
//  */
// const raycaster = new THREE.Raycaster()
// // const rayOrigin = new THREE.Vector3(-3, 0, 0)
// // const rayDirection = new THREE.Vector3(10,0,0)
// // rayDirection.normalize()
// // raycaster.set(rayOrigin, rayDirection)
// // const intersect = raycaster.intersectObject(buttonObj)
// // console.log(intersect)


// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let oldElapsedTime = 0

// let currentIntersect = null

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - oldElapsedTime
//     oldElapsedTime = elapsedTime

//     // cast a ray
//     raycaster.setFromCamera(mouse, camera)
    
//     const objectsToTest = [buttonObj]
//     const intersects = raycaster.intersectObjects(objectsToTest)

//     if (intersects.length){
//         if (currentIntersect === null){
//             console.log('mouse Enter')
//         }
//         currentIntersect = intersects[0]
//     }
//     else {
//         if (currentIntersect){
//             console.log('mouse leave')
//         }
//         currentIntersect = null
//     }


//     // Update physics world
//     world.step(1/60, deltaTime, 3)
//     for(const object of objectsToUpdate){
//         object.mesh.position.copy(object.body.position)
//         object.mesh.quaternion.copy(object.body.quaternion)

//     }


//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()