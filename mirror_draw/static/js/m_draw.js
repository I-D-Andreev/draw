import { MirrorCanvas } from './mirror_canvas.js'
window.addEventListener('load', ()=> {
    var cel = document.getElementById('md_canvas');
    var canvas = new MirrorCanvas(cel, window); // ??? maybe redo canvas on window size change
})
