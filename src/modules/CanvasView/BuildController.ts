import HouseBuild from "../../gameObjects/builds/HouseBuild";
import MineBuild from "../../gameObjects/builds/MineBuild";
import StoreBuild from "../../gameObjects/builds/StoreBuild";
import GameObjectsManager from "../../managers/GameObjectsManager";

class BuildController {

    constructor () {
    }

    buildEvent (buildName: string) {
        switch (buildName) {
            case "mineBuild":
                this.mineBuild();
            break;

            case "houseBuild":
                this.houseBuild();
            break;

            case "storeBuild":
                this.storeBuild();
            break;

            default:
                console.log("BuildController::Undefined, ", buildName);
        }
    }

    mineBuild () {
        GameObjectsManager.bluePrint.setBuild(64, 64, "mine_build", new MineBuild());
    }

    houseBuild () {
        GameObjectsManager.bluePrint.setBuild(64, 64, "house_build", new HouseBuild())
    }

    storeBuild () {
        GameObjectsManager.bluePrint.setBuild(64, 64, "mine_build", new StoreBuild());
    }
}

export default BuildController;