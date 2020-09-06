import { MirrorCanvas } from './mirror_canvas.js'
import { CanvasSaver } from './canvas_saver.js'
window.addEventListener('load', ()=> {
    var canvas_element = document.getElementById('md_canvas');
    var horizontal_line = document.getElementById('horizontal_line');
    var vertical_line = document.getElementById('vertical_line');

    var horizontal_button = document.getElementById('horizontal_button');
    var vertical_button = document.getElementById('vertical_button');
    var canvas = new MirrorCanvas(canvas_element, horizontal_line, vertical_line, horizontal_button, vertical_button, window);

    var save_button = document.getElementById('save_button');
    var canvas_saver = new CanvasSaver(canvas, save_button);
  })
