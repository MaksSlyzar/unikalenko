import BuildController from "./BuildController";
import CanvasManger from "../../managers/CanvasManager";

class BuildPanel {
    buildPanelDiv: HTMLElement|null;
    buildController: BuildController;

    constructor () {
        this.buildController = new BuildController();
        this.buildPanelDiv = document.getElementById("BuildPanel");
        this.init();
    }

    init () {
        console.log(this.addBuilds());
    }

    addBuilds () {
        if (this.buildPanelDiv == null)
            return new Error("Problems with html(#BuildPanel)");

        const builds = [
            {
                imgSrc: require("../../assets/base.png").default,
                name: "Base",
                description: "",
                datasetName: "houseBuild"
            },
            {
                imgSrc: require("../../assets/minebuild.png").default,
                name: "Mine build",
                description: "",
                datasetName: "mineBuild"
            }
        ];

        builds.map(build => {
            const img = document.createElement("img");
            const item = document.createElement("div");
            
            item.className = "item";
            img.src = build.imgSrc;

            img.width = 64;
            img.height = 64;

            item.appendChild(img);
            item.dataset["build"] = build.datasetName;
            this.buildPanelDiv?.appendChild(item);
        });

        this.buildPanelDiv.onclick = (event) => {
            const target = event.target as HTMLElement;
            
            const item = target.parentElement as HTMLElement;

            console.log(item.dataset["build"]);

            this.buildController.buildEvent(item.dataset["build"]);
        }
    }

}

export default BuildPanel;