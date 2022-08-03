import Experience from "../experience";
import Box from "./Box";
import Environment from "./Environment";
import Floor from "./Floor";
import Sphere from "./Sphere";


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
            this.environment = new Environment()
        })
    }

    update(){
        if(this.sphere){
            this.sphere.update()
        }
        if(this.box){
            this.box.update()
        }

    }
}