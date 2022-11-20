import Camera from "../Camera";
import CanvasView from "../../managers/CanvasManager";
import StoneMiner from "./modules/StoneMiner";
import CanvasManager from "../../managers/CanvasManager";
import GameObjectsManager from "../../managers/GameObjectsManager";
import UnitMoveComponent from "./components/UnitMoveComponent";

class Unit {
    posX: number = 50;
    posY: number = 250;
    imageProps = {
        x: 0,
        y: 0,
        width: 24,
        height: 24
    };
    image: CanvasImageSource|null = null;
    stoneMiner: StoneMiner = new StoneMiner(this);
    type = "default";
    id: number;
    width: number = 24;
    height: number = 24;
    unitMoveComponent: UnitMoveComponent;

    constructor () {
        this.id = Math.floor(Math.random() * 1000000);
        this.unitMoveComponent = new UnitMoveComponent(this);
    }

    draw () {
        const camera = GameObjectsManager.camera;
        const drawParams = camera.doPosition(this.posX, this.posY, this.imageProps.width, this.imageProps.height);
        CanvasManager.ctx?.beginPath();
        CanvasManager.ctx?.arc(drawParams.x, drawParams.y, drawParams.width / 2, 0, Math.PI * 2, false);
        if (CanvasManager.ctx != null) {
            CanvasManager.ctx.fillStyle = "rgb(200, 200, 200)";
            CanvasManager.ctx.strokeStyle = "gray";
            CanvasManager.ctx.lineWidth = 2;
        }
        CanvasManager.ctx?.fill();
        CanvasManager.ctx?.stroke();
        CanvasManager.ctx?.closePath();
    }

    update () {
        this.unitMoveComponent.update();
    }


    // moveTo (target: { posX: number, posY: number }) {
    //     const targetX = this.target.pos.x;
    //     const targetY = this.target.pos.y;

    //     let rad = Math.atan2(targetY-this.pos.y,this.pos.x-targetX);
    //     this.rotateAngle = -rad + 90 * Math.PI / 180;

    //     let xDeg = Math.cos(rad)*this.movespeed;
    //     let yDeg = Math.sin(rad)*this.movespeed;


    //     this.transformObject(this, new Pos(this.pos.x - xDeg, this.pos.y + yDeg));
    // }
}

export default Unit;