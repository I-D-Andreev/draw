import { SizedCanvas } from './sized_canvas.js'
window.addEventListener('load', ()=> {
    var cel = document.getElementById('md_canvas');
    var canvas = new SizedCanvas(cel, window); // ??? maybe redo canvas on window size change
})
