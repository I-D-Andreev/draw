class DrawingLoader {
    constructor(id_box, id_button, img) {
        this.id_box = id_box;
        this.id_button = id_button;
        this.img = img;

        this.id_button.addEventListener('click', this.#load_drawing.bind(this));
    }

    #load_drawing() {
        var drawing_id = this.id_box.value;
        if (drawing_id.length > 0 && !isNaN(drawing_id)) {
            this.#query_database(drawing_id);
        }
    }

    #query_database(drawing_id) {
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
                    console.log('Here');
                    console.log('Data' + data.data);
                    console.log(this);
                    this.img.src = data.data;
                } else {
                    console.log('Response Error:', data.reason);
                }
            })
            .catch((error) => {
                console.error('Promise Error:', error);
            });

    }


}

export { DrawingLoader };


