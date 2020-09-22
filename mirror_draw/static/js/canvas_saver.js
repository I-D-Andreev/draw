import { DrawingDownloader } from './drawing_downloader.js'
class CanvasSaver {
    constructor(mirror_canvas, save_button, download_button, id_display) {
        this.mirror_canvas = mirror_canvas;
        this.save_button = save_button;
        this.download_button = download_button;
        this.id_display_field = id_display;

        this.save_button.addEventListener('click', this.save_image.bind(this));
        this.download_button.addEventListener('click', this.download_image.bind(this));
        this.id = null;
    }

    download_image(){
        if (!this.mirror_canvas.is_saved){
            this.save_image();
        }

        DrawingDownloader.download(this.mirror_canvas.encode_canvas());
    }

    save_image() {
        let cdata = this.mirror_canvas.encode_canvas();
        let body = {
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
        let body_str = JSON.stringify(body);

        let req = new Request('/draw/mirror_draw/save',
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
                    this.mirror_canvas.is_saved = true;
                    this.id_display_field.innerHTML = this.id;
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


