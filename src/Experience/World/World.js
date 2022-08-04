import Experience from "../experience";
import Box from "./Box";
import Environment from "./Environment";
import Floor from "./Floor";
import Sphere from "./Sphere";
import Button from "./Button";
import Ramp from "./Ramp";
import Lever from "./Lever";


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
            // this.ramp = new Ramp()
            this.lever = new Lever
            this.environment = new Environment()
            this.init()
        })
    }

    init(){
        // initial objects in the world
        // this.ramp.init()
        this.lever.init()
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

    }
}