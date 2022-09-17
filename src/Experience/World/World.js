import Experience from "../experience";
import Box from "./Box";
import Environment from "./Environment";
import Floor from "./Floor";
import Sphere from "./Sphere";
import Button from "./Button";
import Ramp from "./Ramp";
import Lever from "./Lever";
import depositLever from "./depositLever";
import City from "./City";


export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.resources.on('ready', () => {
            console.log('everything is loaded')
            // Setup 
            this.floor = new Floor()
            this.sphere = new Sphere()
            this.box = new Box()
            this.button = new Button()
            this.ramp = new Ramp()
            this.lever = new Lever()
            this.city = new City()
            this.depositLever = new depositLever()
            this.environment = new Environment()
            this.init()
        })
    }

    init(){
        // initial objects in the world   
        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: 0, y:19, z: 0}, 0.03)
        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: -3, y:17.7, z: 4.5}, -0.03, 0.5, 0.03)
        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: -7, y:16.5, z: 1.5}, -0.03)
        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: -10, y:15.5, z: -3}, -0.03, 0.5, 0.03)
        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: -14.5, y:14.3, z: 0}, 0.03)
        this.lever.init(2, 0.3, 18, {x: -22 , y:13, z: 4.5}, 0.5)

        this.ramp.createWalledRamp(1.3, 0.3, 7, {x: -14.5, y:20, z: 4.5}, 0.01, 0.5)
        this.experience.world.box.createBox(1.5, 0.3, 0.3, {x: -17.8, y:20.5, z: 4.5}, 0.05)
        this.experience.world.sphere.createSphere(0.4, {x: -16.6, y:21, z: 4.5})

        // this.ramp.createBasicRamp(2, 0.3, 5, {x: 1, y:4, z: 1})
        // this.box.createBox(1, 2, 0.5, {x: 1 , y:0.5, z: 7.5}, 0)
   
        // this.ramp.createWalledRamp(1.3, 0.3, 5, {x: 1, y:4, z: 1}, 0.05)
        // this.lramp = this.ramp.createWalledRamp(2, 0.3, 10, {x: 2, y:1.8, z: 6}, 0.1, 0.25, -0.1)
        // this.depositLever.init(0.3, 0.3, 10, {x: 1 , y:5, z: 4.5})

        // this.lever.init(2, 0.3, 10, {x: 1 , y:5, z: 1}, 0.5)

    }

    update(){
        if(this.sphere){
            this.sphere.update()
        }
        if(this.box){
            this.box.update()
        }
        if(this.lever){
            this.lever.update()
        }
        if(this.depositLever){
            this.depositLever.update()
        }

    }
}