class CanvasEvents {
    public leftClickCallbacks: Array<(event: Event) => void> = [];

    constructor (canvas: HTMLCanvasElement) {
        canvas.onclick = (event) => {
            this.leftClickCallbacks.map(cb => {
                cb(event);
            });
        };
    }

    setLeftOnClick (callback: (event: Event) => void) {
        this.leftClickCallbacks.push(callback);
    }
}

export default CanvasEvents;