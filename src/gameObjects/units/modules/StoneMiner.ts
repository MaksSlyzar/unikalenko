import MineBuild from "../../builds/MineBuild";
import StoneOre from "../../worldResources/StoneOre";
import Unit from "../Unit";

class StoneMiner {
    unit: Unit;
    mineBuild: MineBuild|null = null;
    stoneOre: StoneOre|null = null;
    todo: Array<string> = [];

    constructor (unit: Unit) {
        this.unit = unit;
    }

    update () {
        
    }

    extractResource (stoneOre: StoneOre) {
        this.unit.type = "stoneMiner";
        this.stoneOre = stoneOre;
        this.todo = [
            "moveToA"
        ];
    }
}

export default StoneMiner;