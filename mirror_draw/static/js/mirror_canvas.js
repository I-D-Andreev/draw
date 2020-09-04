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

        this.x_axis_pos = this.window.innerHeight / 2;
        this.y_axis_pos = this.window.innerWidth / 2;

        this.x_axis_on = false;        
        this.y_axis_on = false;        

        this.#init_canvas();
        this.#init_mirror_lines();
    }

    get x() {
        return this.#x;
    }


    get y() {
        return this.#y;
    }

    get_coord(e) {
        return { x: e.pageX - this.offset_left, y: e.pageY - this.offset_top };
    }

    update_draw_position(e) {
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
        var canvas_border_size = parseInt(getComputedStyle(this.canvas).borderWidth.replace('px', ''))

        this.horizontal_line.style.top = this.x_axis_pos + 'px';
        this.horizontal_line.style.left = this.offset_left + 'px';
        this.horizontal_line.style.width = (this.canvas_width + 2 * canvas_border_size) + 'px';

        this.vertical_line.style.top = this.offset_top + canvas_border_size + 'px';
        this.vertical_line.style.left = this.y_axis_pos + 'px';
        this.vertical_line.style.height = (this.canvas_height + 2 * canvas_border_size) + 'px';
        
        this.x_axis_on = true;
        this.y_axis_on = true;
    }

    #start_draw(e) {
        this.update_draw_position(e);
        this.currently_drawing = true;
    }

    #draw(e) {
        if (this.currently_drawing) {
            var curr = this.get_coord(e);
            this.#mirror_paint(this.x, this.y, curr.x, curr.y);
            this.update_draw_position(e);
        }
    }

    #stop_draw(e) {
        if (this.currently_drawing) {
            var curr = this.get_coord(e);
            this.#mirror_paint(this.x, this.y, curr.x, curr.y);
            this.currently_drawing = false;
        }
    }

    #mirror_paint(x1, y1, x2, y2) {
        this.context.beginPath();
        this.#init_brush();
        
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);

        var x_axis = this.x_axis_pos - this.offset_top;
        var y_axis = this.y_axis_pos - this.offset_left;

        if(this.x_axis_on){
            this.context.moveTo(x1, x_axis + (x_axis - y1));
            this.context.lineTo(x2, x_axis + (x_axis - y2));
        }


        if(this.y_axis_on){
            this.context.moveTo(y_axis + (y_axis - x1), y1);
            this.context.lineTo(y_axis + (y_axis - x2), y2);
        }

        
        if(this.x_axis_on && this.y_axis_on){
            this.context.moveTo(y_axis + (y_axis - x1), x_axis + (x_axis - y1));
            this.context.lineTo(y_axis + (y_axis - x2), x_axis + (x_axis - y2));
        }

        this.context.stroke();
        this.context.closePath();
    }


}

export { MirrorCanvas };