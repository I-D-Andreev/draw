import { DrawingLoader } from './drawing_loader.js'

class DrawingLoaderID {
    constructor(img_element, id_label_element) {
        this.img = img_element;
        this.id_label = id_label_element;

        this.drawing_loader = new DrawingLoader(this.img);
    
        this.img.addEventListener('load', this.#on_image_load.bind(this));
    }

    #on_image_load(){
        this.id_label.innerHTML = this.drawing_loader.current_id ? this.drawing_loader.current_id : 'None';
    }

}

export { DrawingLoaderID };