import CanvasManager from "../managers/CanvasManager";

class Camera {
    posX: number = 0;
    posY: number = 0;
    speed: number = 10;
    defaultSize: number = 1;

    constructor () {
        
    }

    doPosition(x: number, y: number, width: number, height: number) {
        return {
            x: x - this.posX,
            y: y - this.posY,
            width: width / this.defaultSize,
            height: height / this.defaultSize
        }
    }

    update () {
        if (CanvasManager.keyDown("d")) {
            this.posX += this.speed;
        }
        if (CanvasManager.keyDown("a")) {
            this.posX -= this.speed;
        }
        if (CanvasManager.keyDown("w")) {
            this.posY -= this.speed;
        }
        if (CanvasManager.keyDown("s")) {
            this.posY += this.speed;
        }
        // if (CanvasManager.keyDown("q")) {
        //     this.defaultSize -= 0.01;
        // }
        // if (CanvasManager.keyDown("e")) {
        //     this.defaultSize += 0.01;
        // }
    }
}

export default Camera;