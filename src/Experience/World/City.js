import Experience from "../experience";
import * as THREE from 'three'

export default class City{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.TokyoModel
        this.setModel()
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.1, 0.1, 0.1)
        this.model.rotation.set(0, -1.5, 0)
        this.model.position.set(3, 0,-5)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
    }
}