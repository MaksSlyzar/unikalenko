import Camera from "./gameObjects/Camera";
import AssetsManager from "./managers/AssetsManager";
import CanvasManager from "./managers/CanvasManager";
import GameObjectsManager from "./managers/GameObjectsManager";

class MainEngine {
    camera: Camera;

    constructor () {

        AssetsManager.loadImages();
        this.update();
    }

    update () {
        CanvasManager.clear();
        GameObjectsManager.draw();
        requestAnimationFrame(() => this.update());
    }
}

export default MainEngine;