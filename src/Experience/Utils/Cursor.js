import Experience from "../experience";
import EventEmitter from "./EventEmitter";
import * as THREE from 'three'

export default class Cursor extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX /this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY /this.sizes.height * 2) + 1
        })

        window.addEventListener('click', () => {
            this.currentIntersect = this.experience.raycaster.currentIntersect
            if(this.currentIntersect){
                this.trigger('click')
            }

        })
    }


}