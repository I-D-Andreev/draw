import { DrawingLoader } from './drawing_loader.js'
window.addEventListener('load', () => {
    var id_box = document.getElementById('id_textbox');
    var id_button = document.getElementById('id_button');
    var img = document.getElementById('drawing');

    var draw_loader = new DrawingLoader(id_box, id_button, img);


})
