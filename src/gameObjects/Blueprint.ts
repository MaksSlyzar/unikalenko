import Camera from "./Camera";
import CanvasManager from "../managers/CanvasManager";
import AssetsManager from "../managers/AssetsManager";
import GameObjectsManager from "../managers/GameObjectsManager";
import CheckCollision from "../modules/Collider/CheckCollision";
import BuildObject from "./builds/BuildObject";
import MineBuild from "./builds/MineBuild";


class Blueprint {
    buildWidth: number|null = null;
    buildHeight: number|null = null;
    buildImageName: string|null = null;
    on: boolean = false;
    buildObject: BuildObject;
    
    constructor () {
        // window.onload = () => {
            this.start();
        // }
    }

    start () {
        CanvasManager.events.setLeftOnClick((event) => this.leftClickEvent(event));
    }

    setBuild (width: number, height: number, imageName: string, buildObject: BuildObject) {
        this.buildObject = buildObject;
        this.buildWidth = width;
        this.buildHeight = height;
        this.buildImageName = imageName;
        this.on = true;
    }

    leftClickEvent (event: Event) {
        const camera = GameObjectsManager.camera;
        if (this.on) {
            const mouse = CanvasManager.mouse;
            let drawX = (mouse.x - this.buildWidth / 2);
            // drawX -= drawX % 32;
            let drawY = mouse.y - this.buildHeight / 2;
            // drawY -= drawY % 32;
            // console.log(drawX, drawY)

            let cliteX = drawX - (drawX % 32) - camera.posX % 32 + camera.posX;
            let cliteY = drawY - (drawY % 32) - camera.posY % 32 + camera.posY;

            let build = true;
            GameObjectsManager.resourceObjects.forEach(obj => {
                const _build = CheckCollision({
                    x: obj.posX,
                    y: obj.posY,
                    width: obj.cliteWidth * 32,
                    height: obj.cliteHeight * 32
                },
                {
                    x: cliteX,
                    y: cliteY,
                    width: 64,
                    height: 64
                });

                if (_build == false)
                    build = false;
            });
            
            if (build) {
                this.buildObject.posX = cliteX;
                this.buildObject.posY = cliteY;
                this.on = false;
                GameObjectsManager.build(this.buildObject);
            }
        }
    }

    draw () {
        const camera = GameObjectsManager.camera;

        if (this.on == false)
            return;

        if (AssetsManager.loaded == false)
            return;
        
        const sprite = AssetsManager.sprites[this.buildImageName];
        if (!sprite)
            return;

        
        GameObjectsManager.resourceObjects.forEach(obj => {
            const fromCameraPos = camera.doPosition(obj.posX, obj.posY, obj.width, obj.height);
            
            for (let x = 0; x < obj.cliteWidth; x++) {
                for (let y = 0; y < obj.cliteHeight; y++) {
                    const cliteSprite = AssetsManager.sprites["badclite"];
                    CanvasManager.ctx.drawImage(cliteSprite.image, x * 32 + fromCameraPos.x, y * 32 + fromCameraPos.y);
                }
            }
        });
        // const build = BuildManager.getObjects();
        // //draw clites


        const mouse = CanvasManager.mouse;
        let drawX = (mouse.x - this.buildWidth / 2);
        // drawX -= drawX % 32;
        let drawY = mouse.y - this.buildHeight / 2;
        // drawY -= drawY % 32;
        // console.log(drawX, drawY)

        let cliteX = drawX - (drawX % 32) - camera.posX % 32;
        let cliteY = drawY - (drawY % 32) - camera.posY % 32;

        for (let x = 0; x < 2; x++) {
            for (let y = 0; y < 2; y++) {
                const cliteSprite = AssetsManager.sprites["goodclite"];
                CanvasManager.ctx.drawImage(cliteSprite.image, cliteX + 32 * x, cliteY + 32 * y);
            }
        }

        

        CanvasManager.ctx.drawImage(sprite.image, drawX, drawY, this.buildWidth, this.buildHeight);
    }

    update () {
        if (CanvasManager.keyDown("q"))
            this.on = false;
    }
}

export default Blueprint;