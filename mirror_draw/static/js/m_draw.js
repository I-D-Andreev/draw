import { MirrorCanvas } from './mirror_canvas.js'
import { CanvasSaver } from './canvas_saver.js'
import { DrawingLoader } from './drawing_loader.js'
import { CoulourLinePicker } from './colour_line_picker.js'

window.addEventListener('load', () => {
  let colour_picker_el = document.getElementById('colour_picker');
  let minus_button = document.getElementById('minus_width');
  let plus_button = document.getElementById('plus_width');
  let line_width_el = document.getElementById('line_width');
  let colour_line_picker = new CoulourLinePicker(colour_picker_el, plus_button, minus_button, line_width_el);

  let canvas_element = document.getElementById('md_canvas');
  let horizontal_line = document.getElementById('horizontal_line');
  let vertical_line = document.getElementById('vertical_line');
  let horizontal_button = document.getElementById('horizontal_button');
  let vertical_button = document.getElementById('vertical_button');
  let eraser_button = document.getElementById('eraser');
  let canvas = new MirrorCanvas(canvas_element, horizontal_line, vertical_line, horizontal_button, vertical_button, colour_line_picker, eraser, window);

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
