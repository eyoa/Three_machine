import * as THREE from 'three'
import Experience from '../experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience()
        this.mouse = this.experience.cursor.mouse
        this.objectsToInteract = this.experience.objectsToInteract
        this.camera = this.experience.camera
        this.currentIntersect = null
        this.raycaster = new THREE.Raycaster()
    }

    update(){
        if (this.raycaster) {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            this.intersects = this.raycaster.intersectObjects(this.objectsToInteract)
            
            if(this.intersects.length){
                if (this.currentIntersect === null){
                    this.trigger('hover', this.intersects)
                }
                this.currentIntersect = this.intersects[0]
            }
            else {
                if (this.currentIntersect){
                    this.trigger('leave', [this.currentIntersect])
                }
                this.currentIntersect = null
            }

        }    
    
    }

}