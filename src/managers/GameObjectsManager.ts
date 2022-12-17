import Camera from "../gameObjects/Camera";
import GameObject from "../gameObjects/GameObject";
import ResourceObject from "../gameObjects/worldResources/ResourceObject";
import StoneOre from "../gameObjects/worldResources/StoneOre";
import Blueprint from "../gameObjects/Blueprint";
import CanvasView from "./CanvasManager";
import CanvasManager from "./CanvasManager";
import BuildObject from "../gameObjects/builds/BuildObject";
import loaded from "../loaded";
import Unit from "../gameObjects/units/Unit";

class GameObjectsManager {
    camera: Camera;
    bluePrint: Blueprint;
    resourceObjects: Array<ResourceObject> = [];
    buildObjects: Array<BuildObject> = [];
    unitObjects: Array<Unit> = [];
    loaded: boolean = false;

    constructor () {
        if (loaded.isLoaded() == true)
            this.start();

        loaded.onLoaded(() => {
            this.start();
        });
    }
    
    start () {
        this.camera = new Camera();
        this.bluePrint = new Blueprint();
        this.resourceObjects.push(new StoneOre());
    }

    draw () {
        if (loaded.isLoaded() == false)
            return;

        this.resourceObjects.map((object) => object.draw());
        this.buildObjects.map((object) => { object.draw(); object.update(); });
        this.unitObjects.map((object) => { object.draw(); object.update() });
        this.bluePrint.draw();
        this.camera.update();
        this.bluePrint.update();
    }

    getUnitsByType (type: string) {

    }

    build (build: BuildObject) {
        build.builded();
        this.buildObjects.push(build);
    }
}

export default new GameObjectsManager();