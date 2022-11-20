import CanvasView from "../../managers/CanvasManager";
import Camera from "../Camera";
import AssetsManager from "../../managers/AssetsManager";
import Unit from "../units/Unit";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import BuildObject from "./BuildObject";

class HouseBuild extends BuildObject {
    posX: number = 200;
    posY: number = 200;
    image: CanvasImageData|null = null;
    imageProps = {
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };
    width =  64;
    height = 64;
    type = "mineBuild";
    units: Array<Unit>;
    

    constructor () {
        super();
    }

    builded () {
        this.spawnUnit();
    }

    update () {
        
    }

    spawnUnit () {
        const unit = new Unit();

        unit.posX = this.posX + 32;
        unit.posY = this.posY - 20;

        GameObjectsManager.unitObjects.push(unit);
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
        
        CanvasManager.ctx?.drawImage(AssetsManager.sprites["house_build"].image, drawParams.x, drawParams.y, drawParams.width, drawParams.height);
        
        return {
            _type: "Info",
            data: "Successfully drawed!"
        }
    }
}

export default HouseBuild;