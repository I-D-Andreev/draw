import { MirrorCanvas } from './mirror_canvas.js'
window.addEventListener('load', ()=> {
    var canvas_element = document.getElementById('md_canvas');
    var hl = document.getElementById('horizontal_line');
    var vl = document.getElementById('vertical_line');

    var canvas = new MirrorCanvas(canvas_element, hl, vl, window);
  })
