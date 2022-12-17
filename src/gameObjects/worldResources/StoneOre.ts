import CanvasView from "../../managers/CanvasManager";
import Camera from "../Camera";
import AssetsManager from "../../managers/AssetsManager";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import ResourceObject from "./ResourceObject";

class StoneOre extends ResourceObject {
    posX: number = 64;
    posY: number = 64;
    imageProps = {
        x: 0,
        y: 0,
        width: 96,
        height: 96
    };
    cliteWidth = 3;
    cliteHeight = 3;
    width = 96;
    height = 96;
    image: CanvasImageSource|null = null;

    constructor () {
        super();
        CanvasManager.events.setLeftOnClick((event) => this.onLeftClick(event));
    }

    onLeftClick (event: Event) {
        const vec = GameObjectsManager.camera.doPosition(this.posX, this.posY, this.width, this.height);
        
        const mouse = CanvasManager.mouse;

        if (mouse.x > vec.x && mouse.x < mouse.x + vec.width) {
            if (mouse.y > vec.y && mouse.y < vec.y + vec.height) {
                
            }
        }
    }

    draw () {
        const camera = GameObjectsManager.camera;
        
        if (!AssetsManager.loaded)
            return {
                _type: "Error",
                data: "Image not found"
            }

        const drawParams = camera.doPosition(this.posX, this.posY, this.imageProps.width, this.imageProps.height);
    
        CanvasManager.ctx?.drawImage(AssetsManager.sprites["stone_ore"].image, drawParams.x, drawParams.y, drawParams.width, drawParams.height);
    
        // canvasView.ctx?.beginPath();
        // canvasView.ctx?.arc(drawParams.x + drawParams.width / 2, drawParams.y + drawParams.height / 2, drawParams.width / 2, 0, Math.PI * 2, false);
        // if (canvasView.ctx != null) {
        //     canvasView.ctx.fillStyle = "rgb(58, 64, 79)";
        //     canvasView.ctx.strokeStyle = "gray";
        //     canvasView.ctx.lineWidth = 4;
        // }
        // canvasView.ctx?.fill();
        // canvasView.ctx?.stroke();
        // canvasView.ctx?.closePath();
        
        return {
            _type: "Info",
            data: "Successfully drawed!"
        }
    }
}

export default StoneOre;