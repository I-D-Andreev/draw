class DrawingLoader {
    constructor(id_box, id_button, img) {
        this.id_box = id_box;
        this.id_button = id_button;
        this.img = img;
        
        // todo:
        // event listener on textbox to check that ID is a number
        // event listener on button to send AJAX query and fill in the img
        // ? the query should use URL parameters?
        console.log('Loaded');
    }

}

export { DrawingLoader };


