import CanvasView from "../../managers/CanvasManager";
import Camera from "../Camera";
import AssetsManager from "../../managers/AssetsManager";
import Unit from "../units/Unit";
import StoneOre from "../worldResources/StoneOre";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import BuildObject from "./BuildObject";

class MineBuild extends BuildObject {
    posX: number = 200;
    posY: number = 200;
    image: CanvasImageData|null = null;
    imageProps = {
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };
    type = "mineBuild";
    units: Array<Unit>;
    stoneOre: StoneOre|null = null;
    width = 64;
    height = 64;

    constructor () {
        // this.units = [];
        super();
    }

    update () {
        GameObjectsManager.unitObjects.map(unit => {
            if (unit.type == "default") {
                console.log("unit searched")
                unit.type = "miner";
                unit.unitMoveComponent.moveToObject(this, () => {}, () => {});
            }
        })
    }

    setStoneOre (stoneOre: StoneOre) {
        this.stoneOre = stoneOre;
    }

    addUnit (unit: Unit) {
        this.units.push(unit);
        if (this.stoneOre == null)
            return;
        unit.stoneMiner.extractResource(this.stoneOre);
    }

    draw () {
        const camera = GameObjectsManager.camera;
        
        if (!AssetsManager.loaded)
            return {
                _type: "Error",
                data: "Image not found"
            }

        const drawParams = camera.doPosition(this.posX, this.posY, this.imageProps.width, this.imageProps.height);
        
        CanvasManager.ctx?.beginPath();
        CanvasManager.ctx?.arc(drawParams.x + drawParams.width / 2, drawParams.y + drawParams.height / 2, drawParams.width / 2, 0, Math.PI * 2, false);
        if (CanvasManager.ctx != null) {
            CanvasManager.ctx.fillStyle = "gray";
            //filstyle rgb(80, 80, 80)
            CanvasManager.ctx.strokeStyle = "silver";
            CanvasManager.ctx.lineWidth = 4;
        }
        CanvasManager.ctx?.fill();
        CanvasManager.ctx?.stroke();
        CanvasManager.ctx?.closePath();
        
        CanvasManager.ctx?.drawImage(AssetsManager.sprites["mine_build"].image, drawParams.x, drawParams.y, drawParams.width, drawParams.height);
        
        return {
            _type: "Info",
            data: "Successfully drawed!"
        }
    }
}

export default MineBuild;