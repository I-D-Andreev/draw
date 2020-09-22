class CoulourLinePicker {
    constructor(colour_picker, plus_button, minus_button, line_size){
        this.colour_picker = colour_picker;
        this.plus_button = plus_button;
        this.minus_button = minus_button;
        this.line_size = line_size;
        
        this.plus_button.addEventListener('click', this.#change_line_size.bind(this, 1));
        this.minus_button.addEventListener('click', this.#change_line_size.bind(this, -1));
    }

    #change_line_size(change){
        let new_val = parseInt(this.line_size.innerHTML) + change;
        this.line_size.innerHTML = Math.max(1, new_val);
    }

    get_size(){
        return parseInt(this.line_size.innerHTML);
    }

    get_colour(){
        return this.colour_picker.value;
    }
}

export { CoulourLinePicker };


