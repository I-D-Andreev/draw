import { MirrorCanvas } from './mirror_canvas.js'
window.addEventListener('load', ()=> {
    var canvas_element = document.getElementById('md_canvas');
    var canvas = new MirrorCanvas(canvas_element, window); // ??? maybe redo canvas on window size change
})
