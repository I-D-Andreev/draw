class MirrorCanvas {
    constructor(canvas, window, canvas_width_percent = 80, canvas_height_percent = 80) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d');
        this.window = window

        this.width = canvas_width_percent / 100 * this.window.innerWidth;
        this.height = canvas_height_percent / 100 * this.window.innerHeight;
        this.offsetleft = ((100 - canvas_width_percent) / 2) / 100 * this.window.innerWidth;
        this.offsettop = ((100 - canvas_height_percent) / 2) / 100 * this.window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.left = this.offsetleft + 'px';
        this.canvas.style.top = this.offsettop + 'px';
    }
}

export { MirrorCanvas };