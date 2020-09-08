class CanvasSaver {
    constructor(mirror_canvas, save_button) {
        this.mirror_canvas = mirror_canvas;
        this.save_button = save_button;
        this.save_button.addEventListener('click', this.save_image.bind(this));
        this.id = null;
    }

    save_image() {
        var cdata = this.mirror_canvas.encode_canvas();
        var body = {
            data: cdata
        }

        if (this.id === null) {
            this.#send_to_db('post', body);
        } else {
            body['id'] = this.id;
            this.#send_to_db('put', body);
        }
    }

    #send_to_db(http_verb, body) {
        var body_str = JSON.stringify(body);

        var req = new Request('/draw/mirror_draw/save',
            {
                headers: { 'X-CSRFToken': csrftoken }
            });

        fetch(req, {
            method: http_verb,
            mode: 'same-origin',
            type: 'application/json',
            body: body_str
        }).then(response => response.json())
            .then(data => {
                console.log('Received:', data);

                if (data.success === true) {
                    this.id = this.id ? this.id : data.id;
                    console.log(this.id);
                } else {
                    console.log('Response Error:', data.reason);
                }
            })
            .catch((error) => {
                console.error('Promise Error:', error);
            });

    }

}

export { CanvasSaver };


