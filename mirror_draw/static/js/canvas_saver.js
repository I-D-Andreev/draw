class CanvasSaver {
    constructor(mirror_canvas, save_button) {
        this.canvas = mirror_canvas;
        this.save_button = save_button;
        this.save_button.addEventListener('click', this.save_image.bind(this));

        this.res = null;
    }

    save_image() {
        this.#send_to_db();
    }

    #send_to_db() {
        var req = new Request('/draw/mirror_draw/save',
            {
                headers: { 'X-CSRFToken': csrftoken }
            });

        // fetch(req, {
        //     method: 'post',
        //     mode: 'same-origin',
        //     body: 'hi'
        // }).then(r => console.log(r));
        fetch(req, {
            method: 'post',
            mode: 'same-origin',
            type: 'plain/text',
            body: 'hi'
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
                console.error('Error:', error);
        });

    }

}

export { CanvasSaver };


