class SizedCanvas {
    constructor(canvas, window, canvas_width_percent = 80, canvas_height_percent = 80) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d');
        this.window = window

        this.canvas.width = canvas_width_percent / 100 * this.window.innerWidth;
        this.canvas.height = canvas_height_percent / 100 * this.window.innerHeight;

        this.canvas.style.left = ((100 - canvas_width_percent) / 2) / 100 * this.window.innerWidth + 'px';
        this.canvas.style.top = ((100 - canvas_height_percent) / 2) / 100 * this.window.innerHeight + 'px';
    }
}

export { SizedCanvas };