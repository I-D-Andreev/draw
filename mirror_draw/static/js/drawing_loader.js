const LOAD_TYPE = {
    IMAGE: "image",
    CANVAS: "canvas",
}

class DrawingLoader {
    constructor(img_element) { // either html img or html canvas
        this.img = img_element;
        this.current_id = null; // the ID of the currently loaded image
    }

    load_image(drawing_id) {
        if (String(drawing_id).length > 0 && !isNaN(drawing_id)) {
            this.#query_database(drawing_id, LOAD_TYPE.IMAGE);
        }
    }

    load_canvas(drawing_id) {
        if (String(drawing_id).length > 0 && !isNaN(drawing_id)) {
            this.#query_database(drawing_id, LOAD_TYPE.CANVAS);
        }
    }

    #query_database(drawing_id, type) {
        var req = new Request('/draw/find/' + drawing_id,
            {
                headers: { 'X-CSRFToken': csrftoken }
            });

        fetch(req, {
            method: 'get',
            mode: 'same-origin',
        }).then(response => response.json())
            .then(data => {
                console.log('Received:', data);

                if (data.success === true) {
                    console.log('Successful load! Type: ' + type);
                    this.current_id = drawing_id;
                    if (type === LOAD_TYPE.IMAGE) {
                        this.img.src = data.data;
                    } else if (type === LOAD_TYPE.CANVAS) {
                        //draw on a canvas
                        var ctx = this.img.getContext('2d');
                        var temp_img = new Image;
                        temp_img.addEventListener('load', () => {
                            ctx.drawImage(temp_img,
                                0, 0, temp_img.width, temp_img.height,
                                0, 0, this.img.width, this.img.height);
                        });
                        temp_img.src = data.data;
                    }

                } else {
                    console.log('Response Error:', data.reason);
                    alert(data.reason);
                }
            })
            .catch((error) => {
                console.error('Promise Error:', error);
            });

    }


}

export { DrawingLoader };


