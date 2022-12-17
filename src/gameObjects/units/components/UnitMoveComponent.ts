import GameObjectsManager from "../../../managers/GameObjectsManager";
import { CheckDistanceArc } from "../../../modules/Collider/CheckDistance";
import BuildObject from "../../builds/BuildObject";
import GameObject from "../../GameObject";
import ResourceObject from "../../worldResources/ResourceObject";
import Unit from "../Unit";

class UnitMoveComponent {
    unit: Unit;
    toObject: BuildObject|GameObject|ResourceObject;
    onEnterObjectCb: () => void;
    onDontEnterObjectCb: () => void;
    on: boolean = false;
    movespeed = 1;

    constructor (unit: Unit) {
        this.unit = unit;
    }

    update () {
        if (this.on == false)
            return;
        
        // const newPosition = null;
        
        const targetX = this.toObject.posX + this.toObject.width / 2;
        const targetY = this.toObject.posY + this.toObject.height / 2;

        const rad = Math.atan2(targetY - this.unit.posY, this.unit.posX - targetX);

        const newPosition = {
            x: this.unit.posX - Math.cos(rad) * this.movespeed,
            y: this.unit.posY + Math.sin(rad) * this.movespeed
        };

        //Collision
        // GameObjectsManager.resourceObjects.map(obj => {
        //     const distanceOtherTarget = { x: obj.posX, y: obj.posY, radius: obj.width / 2 };
        //     if (CheckDistanceArc({ ...newPosition, radius: this.unit.width / 2 }, distanceOtherTarget)) {
        //         const posX = Math.abs(obj.posX - this.unit.posX);
                
        //         // if (posX > distanceOtherTarget.radius)
        //         if (Math.cos(rad) > Math.sin(rad))
        //             newPosition.x += 1;
        //         else 
        //             newPosition.y += 1;
        //         // else
        //         //     newPosition.x -= 1;
        //         console.log(posX);
        //     }
        // });

        this.unit.posX = newPosition.x;
        this.unit.posY = newPosition.y;


        const distanceOtherTarget = { x: this.toObject.posX, y: this.toObject.posY, radius: this.toObject.width / 2 };
        if (CheckDistanceArc({ ...newPosition, radius: this.unit.width / 2 }, distanceOtherTarget)) {
            this.on = false;

            if (this.onEnterObjectCb)
                this.onEnterObjectCb();
        }
    }

    move () {
        // if (this.moveTarget == null)
        //     return;
        // const targetX = this.moveTarget?.posX;
        // const targetY = this.moveTarget?.posY;

        // let rad = Math.atan2(targetY-this.posY,this.posX-targetX);
        // const rotateAngle = -rad + 90 * Math.PI / 180;

        // let xDeg = Math.cos(rad) * this.movespeed;
        // let yDeg = Math.sin(rad) * this.movespeed;

        // this.posX -= xDeg;
        // this.posY += yDeg;
    }

    // moveTo (target: {
    //     posX: number,
    //     posY: number,
    //     finishMoving: () => void
    // }) {
    //     this.moveTarget = target;
    // }

    moveToObject (object: BuildObject|GameObject|ResourceObject, onEnterObjectCb?: ()=>void, onDontEnterObject?: ()=>void) {
        this.on = true;
        this.toObject = object;

        if (onEnterObjectCb)
            this.onDontEnterObjectCb = onDontEnterObject;
        if (onDontEnterObject)
            this.onEnterObjectCb = onEnterObjectCb;
    }
};

export default UnitMoveComponent;