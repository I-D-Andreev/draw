import { DrawingLoader } from './drawing_loader.js'
window.addEventListener('load', () => {
    var id_box = document.getElementById('id_textbox');
    var id_button = document.getElementById('id_button');
    var img = document.getElementById('drawing');

    var drawing_loader = new DrawingLoader(img);

    id_box.addEventListener('keydown', (e)=>{
        // enter
        if(e.key.toLowerCase().includes('enter')){
            id_button.click();
        }
    });

    id_button.addEventListener('click', () => {
        var draw_id = id_box.value;
        drawing_loader.load_drawing(draw_id);
    });
})
