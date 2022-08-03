import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Debug from './Utils/Debug'
import sources from './sources'

let instance = null

export default class Experience {
    constructor(canvas){
        // Singleton
        if(instance){
            return instance
        }
        instance = this
        
        // Global access for debuging
        window.experience = this

        // options
        this.canvas = canvas

        // Physics
        this.physics = new CANNON.World()
        this.physics.broadphase = new CANNON.SAPBroadphase(this.physics)
        this.physics.allowSleep = true
        this.physics.gravity.set(0, -9.82, 0)
        
        // physics material
        const defaultMaterial = new CANNON.Material('default')

        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        this.physics.addContactMaterial(defaultContactMaterial)
        this.physics.defaultContactMaterial = defaultContactMaterial

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.objectsToUpdate = {}

        

        // Sizes resize Event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.physics.step(1/60, this.time.delta, 3)
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}

