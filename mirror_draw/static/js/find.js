import { DrawingLoader } from './drawing_loader.js'
import { DrawingDownloader } from './drawing_downloader.js'

window.addEventListener('load', () => {
    let id_box = document.getElementById('id_textbox');
    let id_button = document.getElementById('id_button');
    let download_button = document.getElementById('download_button');
    let draw_button = document.getElementById('draw_button');

    download_button.disabled = true;

    let img = document.getElementById('drawing');

    let drawing_loader = new DrawingLoader(img);

    id_box.addEventListener('click', ()=>{
        id_box.focus();
        id_box.select();
    });

    id_box.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase().includes('enter')) {
            id_button.click();
        }
    });

    id_button.addEventListener('click', () => {
        let draw_id = id_box.value;
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
        let curr_id = drawing_loader.current_id;
        if (curr_id) {
            location.href = ('../mirror_draw/?id=' + curr_id);
        }
    });
})
