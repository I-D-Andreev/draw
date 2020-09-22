import { MirrorCanvas } from './mirror_canvas.js'
import { CanvasSaver } from './canvas_saver.js'
import { DrawingLoader } from './drawing_loader.js'

window.addEventListener('load', () => {
  let canvas_element = document.getElementById('md_canvas');
  let horizontal_line = document.getElementById('horizontal_line');
  let vertical_line = document.getElementById('vertical_line');

  let horizontal_button = document.getElementById('horizontal_button');
  let vertical_button = document.getElementById('vertical_button');
  let canvas = new MirrorCanvas(canvas_element, horizontal_line, vertical_line, horizontal_button, vertical_button, window);

  let save_button = document.getElementById('save_button');
  let download_button = document.getElementById('download_button');
  let id_display = document.getElementById('id_display');
  let canvas_saver = new CanvasSaver(canvas, save_button, download_button, id_display);

  let canvas_loader = null;
  if(drawing_id > 0){
    canvas_loader = new DrawingLoader(canvas_element);
    canvas_loader.load_canvas(drawing_id);
  }

});
