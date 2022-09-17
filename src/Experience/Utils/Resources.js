import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

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
        this.loaders.GLTFLoader = new GLTFLoader()

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
            }else if (source.type === 'gltfModel'){
                this.loaders.GLTFLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
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