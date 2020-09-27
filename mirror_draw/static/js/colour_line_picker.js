class CoulourLinePicker {
    constructor(colour_picker, plus_button, minus_button, line_size){
        this.colour_picker = colour_picker;
        this.plus_button = plus_button;
        this.minus_button = minus_button;
        this.line_size_el = line_size;
        this.p_line_size = parseInt(this.line_size_el.innerHTML);


        this.plus_button.addEventListener('click', this.p_change_line_size.bind(this, 1));
        this.minus_button.addEventListener('click', this.p_change_line_size.bind(this, -1));
    }

    p_change_line_size(change){
        this.p_line_size = Math.max(1, this.p_line_size + change);
        this.line_size_el.innerHTML = this.p_line_size;
    }

    get_size(){
        return this.p_line_size;
    }

    get_colour(){
        return this.colour_picker.value;
    }
}

export { CoulourLinePicker };


