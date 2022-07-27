import Experience from "../experience";
import * as THREE from 'three'

export default class Environment {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resouces = this.experience.resources

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        this.scene.add(this.ambientLight)

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.set(1024, 1024)
        this.directionalLight.shadow.camera.far = 15
        this.directionalLight.shadow.camera.left = - 7
        this.directionalLight.shadow.camera.top = 7
        this.directionalLight.shadow.camera.right = 7
        this.directionalLight.shadow.camera.bottom = - 7
        this.directionalLight.position.set(5, 5, 5)
        this.scene.add(this.directionalLight)
    }
    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resouces.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true

                }
            })
        }
        this.environmentMap.updateMaterial()
    }

}