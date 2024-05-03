import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};

    this.manager = new THREE.LoadingManager();

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();

    this.loaders.dracoLoader = new DRACOLoader(this.manager);
    this.loaders.dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    ); // use a full url path
    // use a full url path

    this.loaders.ktx2Loader = new KTX2Loader(this.manager);

    this.loaders.gltfLoader = new GLTFLoader(this.manager)
      .setCrossOrigin("anonymous")
      .setDRACOLoader(this.loaders.dracoLoader)
      .setKTX2Loader(this.loaders.ktx2Loader)
      .setMeshoptDecoder(MeshoptDecoder);

    window.createImageBitmap = undefined;
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  loadGLTF(url, callback) {
    // this.manager.setURLModifier((url, path) => {
    //   // URIs in a glTF file may be escaped, or not. Assume that assetMap is
    //   // from an un-escaped source, and decode all URIs before lookups.
    //   // See: https://github.com/donmccurdy/three-gltf-viewer/issues/146
    //   const normalizedURL =
    //     rootPath +
    //     decodeURI(url)
    //       .replace(baseURL, "")
    //       .replace(/^(\.?\/)/, "");

    //   if (assetMap.has(normalizedURL)) {
    //     const blob = assetMap.get(normalizedURL);
    //     const blobURL = URL.createObjectURL(blob);
    //     blobURLs.push(blobURL);
    //     return blobURL;
    //   }

    //   return (path || "") + url;
    // });

    this.loaders.dracoLoader = new DRACOLoader(this.manager);
    this.loaders.dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    ); // use a full url path
    // use a full url path

    this.loaders.ktx2Loader = new KTX2Loader(this.manager);

    this.loaders.gltfLoader = new GLTFLoader(this.manager)
      .setCrossOrigin("anonymous")
      .setDRACOLoader(this.loaders.dracoLoader)
      .setKTX2Loader(this.loaders.ktx2Loader)
      .setMeshoptDecoder(MeshoptDecoder);

    window.createImageBitmap = undefined;

    this.loaders.gltfLoader.load(url, (gltf) => {
      callback(gltf);
    });
  }
}
