import EventEmitter from "./EventEmitter";
import * as THREE from 'three'

export default class Resources extends EventEmitter{
    constructor(sources){
        super()
        
        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders = {}
        // this.loaders.gltLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubetextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading(){
        for (const source of this.sources){
            if (source.type === 'cubeTexture'){
                this.loaders.cubetextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }else if (source.type === 'texture'){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}