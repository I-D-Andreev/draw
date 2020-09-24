class MirrorCanvas {
    #x = 0
    #y = 0

    constructor(canvas, hor_line, ver_line, hor_button, ver_button, colour_picker, eraser_btn, window, canvas_width_percent = 80, canvas_height_percent = 80) {
        this.canvas = canvas;
        this.horizontal_line = hor_line;
        this.vertical_line = ver_line;
        this.horizontal_button = hor_button;
        this.vertical_button = ver_button;
        this.colour_picker = colour_picker;
        this.eraser = eraser;
        this.window = window


        this.context = this.canvas.getContext('2d');
        this.is_saved = false; // is the latest drawing saved
        this.currently_drawing = false;
        this.is_erasing = false;

        this.canvas_width = canvas_width_percent / 100 * this.window.innerWidth;
        this.canvas_height = canvas_height_percent / 100 * this.window.innerHeight;
        this.offset_left = ((100 - canvas_width_percent) / 2) / 100 * this.window.innerWidth;

        let additional_offset_top = 2; // in %
        this.offset_top = (((100 - canvas_height_percent) / 2) + additional_offset_top) / 100 * this.window.innerHeight;

        this.horizontal_line_pos = this.window.innerHeight / 2;
        this.vertical_line_pos = this.window.innerWidth / 2;

        this.horizontal_line_on = true;
        this.vertical_line_on = true;

        this.#init_canvas();
        this.#init_mirror_lines();
        this.#init_line_buttons();
        this.#init_eraser();
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
        let curr = this.get_coord(e);
        this.#x = curr.x;
        this.#y = curr.y;
    }


    #init_canvas() {
        this.canvas.width = this.canvas_width;
        this.canvas.height = this.canvas_height;
        this.canvas.style.left = this.offset_left + 'px';
        this.canvas.style.top = this.offset_top + 'px';

        // fill with white colour
        this.context.fillStyle = 'white';
        this.context.fillRect(0,0, this.canvas_width, this.canvas_height);

        this.window.addEventListener('mousedown', this.#start_draw.bind(this));
        this.window.addEventListener('mousemove', this.#draw.bind(this));

        // drawing may end out of canvas
        this.window.addEventListener('mouseup', this.#stop_draw.bind(this));
    }

    #init_brush() {
        // get from a selector box ?
        this.context.lineWidth = this.colour_picker.get_size();
        this.context.strokeStyle = this.colour_picker.get_colour();
    }

    #init_mirror_lines() {
        let canvas_border_size = parseInt(getComputedStyle(this.canvas).borderWidth.replace('px', ''));

        this.horizontal_line.style.top = this.horizontal_line_pos + 'px';
        this.horizontal_line.style.left = this.offset_left + 'px';
        this.horizontal_line.style.width = (this.canvas_width + 2 * canvas_border_size) + 'px';

        this.vertical_line.style.top = this.offset_top + canvas_border_size + 'px';
        this.vertical_line.style.left = this.vertical_line_pos + 'px';
        this.vertical_line.style.height = (this.canvas_height + 2 * canvas_border_size) + 'px';
    }

    #init_line_buttons() {
        // both buttons should have the same size
        let button_height = parseInt(getComputedStyle(this.horizontal_button).height.replace('px', ''));
        let button_width = parseInt(getComputedStyle(this.horizontal_button).width.replace('px', ''));
        let offset_from_canvas = 10; // pixels inbetween the canvas and the button

        this.horizontal_button.style.left = this.offset_left + this.canvas_width + offset_from_canvas + 'px';
        this.horizontal_button.style.top = this.horizontal_line_pos - (button_height / 2) + 'px';
    
        this.vertical_button.style.left = this.vertical_line_pos - (button_width / 2) + 'px';
        this.vertical_button.style.top = this.offset_top - button_height - offset_from_canvas + 'px';
        
        this.horizontal_button.addEventListener('click', this.#enable_disable_hor_line.bind(this));
        this.vertical_button.addEventListener('click', this.#enable_disable_ver_line.bind(this));
    }

    #init_eraser(){
        this.eraser.addEventListener('click', ()=>{
            this.is_erasing = !this.is_erasing;

            let cursor = this.is_erasing ? 'crosshair' : 'auto';
            let color = this.is_erasing ? 'red' : 'lightseagreen';

            document.getElementsByTagName('body')[0].style.cursor = cursor;
            this.eraser.style.backgroundColor = color;
        });
    }

    #start_draw(e) {
        this.update_draw_position(e);
        this.currently_drawing = true;
    }

    #draw(e) {
        if (this.currently_drawing) {
            let curr = this.get_coord(e);
            this.#mirror_paint(this.x, this.y, curr.x, curr.y);
            this.update_draw_position(e);
        }
    }

    #stop_draw(e) {
        if (this.currently_drawing) {
            let curr = this.get_coord(e);
            this.#mirror_paint(this.x, this.y, curr.x, curr.y);
            this.currently_drawing = false;
        }
    }

    #mirror_paint(x1, y1, x2, y2) {
        this.is_saved = false;

        this.context.beginPath();
        if(this.is_erasing){
            this.context.globalCompositeOperation = 'destination-out';
            this.context.lineWidth = 15;
        } else {
            this.#init_brush();
            this.context.globalCompositeOperation = 'source-over';    
        }

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);

        let x_axis = this.horizontal_line_pos - this.offset_top;
        let y_axis = this.vertical_line_pos - this.offset_left;

        if (this.horizontal_line_on) {
            this.context.moveTo(x1, x_axis + (x_axis - y1));
            this.context.lineTo(x2, x_axis + (x_axis - y2));
        }


        if (this.vertical_line_on) {
            this.context.moveTo(y_axis + (y_axis - x1), y1);
            this.context.lineTo(y_axis + (y_axis - x2), y2);
        }

        if (this.horizontal_line_on && this.vertical_line_on) {
            this.context.moveTo(y_axis + (y_axis - x1), x_axis + (x_axis - y1));
            this.context.lineTo(y_axis + (y_axis - x2), x_axis + (x_axis - y2));
        }

        this.context.stroke();
        this.context.closePath();
    }

    #enable_disable_hor_line(){
        this.horizontal_line_on = !this.horizontal_line_on;
        // '' - show line, 'none' - dont show line
        this.horizontal_line.style.display = !this.horizontal_line.style.display ? 'none' : '';
    }

    #enable_disable_ver_line(){
        this.vertical_line_on = !this.vertical_line_on;
        // '' - show line, 'none' - dont show line
        this.vertical_line.style.display = !this.vertical_line.style.display ? 'none' : '';
    }

    encode_canvas() {
        return this.canvas.toDataURL();
    }

}

export { MirrorCanvas };