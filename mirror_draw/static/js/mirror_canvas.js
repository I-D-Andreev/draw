class MirrorCanvas {
    #x = 0
    #y = 0

    constructor(canvas, hor_line, ver_line, window, canvas_width_percent = 80, canvas_height_percent = 80) {
        this.canvas = canvas
        this.horizontal_line = hor_line
        this.vertical_line = ver_line
        this.context = this.canvas.getContext('2d');
        this.window = window

        this.currently_drawing = false;

        this.canvas_width = canvas_width_percent / 100 * this.window.innerWidth;
        this.canvas_height = canvas_height_percent / 100 * this.window.innerHeight;
        this.offset_left = ((100 - canvas_width_percent) / 2) / 100 * this.window.innerWidth;
        this.offset_top = ((100 - canvas_height_percent) / 2) / 100 * this.window.innerHeight;

        this.#init_canvas();
        this.#init_mirror_lines();
    }

    get x() {
        return this.#x;
    }


    get y() {
        return this.#y;
    }

    get_coord(e){
        return {x: e.pageX - this.offset_left, y: e.pageY - this.offset_top};
    }

    update_draw_position(e){
        var curr = this.get_coord(e);
        this.#x = curr.x;
        this.#y = curr.y;
    }


    #init_canvas() {
        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;
        this.canvas.style.left = this.offset_left + 'px';
        this.canvas.style.top = this.offset_top + 'px';

        this.window.addEventListener('mousedown', this.#start_draw.bind(this));
        this.window.addEventListener('mousemove', this.#draw.bind(this));

        // drawing may end out of canvas
        this.window.addEventListener('mouseup', this.#stop_draw.bind(this));
    }

    #init_brush() {
        // get from a selector box ?
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'green';
    }

    #init_mirror_lines() {
        this.horizontal_line.style.top = this.window.innerHeight / 2 + "px";
        this.horizontal_line.style.left = this.offset_left + "px";
        this.horizontal_line.style.width = this.canvas_width + "px";
        
    }

    #start_draw(e) {
        this.update_draw_position(e);
        this.currently_drawing = true;
    }

    #draw(e) {
        if (this.currently_drawing) {
            var curr = this.get_coord(e);
            this.#paint(this.x, this.y, curr.x, curr.y);
            this.update_draw_position(e);
        }
    }

    #stop_draw(e) {
        if (this.currently_drawing) {
            var curr = this.get_coord(e);
            this.#paint(this.x, this.y, curr.x, curr.y);
            this.currently_drawing = false;
        }
    }

    #paint(x1, y1, x2, y2) {
        this.context.beginPath();
        this.#init_brush();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
    }


}

export { MirrorCanvas };