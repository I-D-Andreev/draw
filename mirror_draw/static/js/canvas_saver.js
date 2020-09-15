class CanvasSaver {
    constructor(mirror_canvas, save_button, download_button) {
        this.mirror_canvas = mirror_canvas;
        this.save_button = save_button;
        this.download_button = download_button;

        this.save_button.addEventListener('click', this.save_image.bind(this));
        this.download_button.addEventListener('click', this.download_image.bind(this));
        this.id = null;
    }

    download_image(){
        console.log(this.id);
        // IE
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(this.mirror_canvas.canvas.msToBlob(), (this.id + '.png'))
        } else {
            console.log('Here');
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = this.mirror_canvas.encode_canvas();
            a.download = (this.id + '.png');
            a.click();
            document.body.removeChild(a);
        }
        


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


