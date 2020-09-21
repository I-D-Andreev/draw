import { DrawingLoader } from './drawing_loader.js'
import { DrawingDownloader } from './drawing_downloader.js'

window.addEventListener('load', () => {
    var id_box = document.getElementById('id_textbox');
    var id_button = document.getElementById('id_button');
    var download_button = document.getElementById('download_button');
    var draw_button = document.getElementById('draw_button');

    download_button.disabled = true;

    var img = document.getElementById('drawing');

    var drawing_loader = new DrawingLoader(img);

    id_box.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase().includes('enter')) {
            id_button.click();
        }
    });

    id_button.addEventListener('click', () => {
        var draw_id = id_box.value;
        drawing_loader.load_image(draw_id);
    });

    img.addEventListener('load', () => {
        download_button.disabled = !img.src;
    });

    download_button.addEventListener('click', () => {
        if (img.src) {
            DrawingDownloader.download(img.src);
        }
    });

    draw_button.addEventListener('click', () => {
        var curr_id = drawing_loader.current_id;
        if (curr_id) {
            location.href = ('mirror_draw/?id=' + curr_id);
        }
    });
})