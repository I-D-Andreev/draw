class CanvasSaver {
    constructor(mirror_canvas, save_button) {
        this.canvas = mirror_canvas;
        this.save_button = save_button;
        this.save_button.addEventListener('click', this.save_image.bind(this));
    }

    save_image(){
        this.#send_to_db();
    }

    #send_to_db() {
        var xh = new XMLHttpRequest();
        
        xh.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // alert('Success');  
            console.log('Success');
          }
          else {
            //   alert('Error');
            console.log('Error');
          }
        };

        xh.open("PUT", "save", true);
        xh.send();
    }



}

export { CanvasSaver };