// import stoneOre from "./../assets/stone_ore.png";
// import base from "./../assets/base.png"
// console

interface Sprite {
    [key: string]: {
        image: CanvasImageSource,
        _type: string
    }
}

class AssetsManager {
    sprites: Sprite = {};
    loaded = false;

    constructor () {
        
    }

    loadImages () {
        const spriteNames = [{
            src: "stone_ore.png",
            name: "stone_ore",
            loaded: false
        },
        {
            src: "minebuild.png",
            name: "mine_build",
            loaded: false
        },
        {
            src: "goodclite.png",
            name: "goodclite",
            loaded: false
        },
        {
            src: "badclite.png",
            name: "badclite",
            loaded: false
        },
        {
            src: "housebuild.png",
            name: "house_build"
        }].map(spriteName => { return {...spriteName, loaded: false }});

        spriteNames.forEach(sprite => {
            try {
                const image = new Image();
                image.src = require("./../assets/" + sprite.src).default;
                
                image.onload = () => {
                    this.sprites[sprite.name] = {
                        image: image,
                        _type: "image"
                    };

                    sprite.loaded = true;
                    
                    let allLoaded = true;

                    spriteNames.forEach(_sprite => {
                        if (_sprite.loaded == false)
                            allLoaded = false;
                    });

                    if (allLoaded)
                        this.allSpriteLoaded();
                }
            } catch (error) {
                console.log("Sprite loading problem", sprite);
                console.log(error)
            }
        });
    }

    allSpriteLoaded () {
        this.loaded = true;
        console.log("All sprites loaded!");
    }
}


export default new AssetsManager();