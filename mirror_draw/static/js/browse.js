import { DrawingLoaderID } from './drawing_loader_with_ID.js'

window.addEventListener('load', () => {
    // todo: get max amount of products through django

    // pad 0th element so that array index matches html elements id
    var loaders = [null];
    var counter = 1;
    var next_button = document.getElementById('next_button');
    var prev_button = document.getElementById('prev_button');



    for (let i=1; i<=4; i++){
        let id_field = document.getElementById('id_label_' + i);
        let img = document.getElementById('drawing_' + i);
        loaders.push(new DrawingLoaderID(img, id_field));
    }

    
    next_button.addEventListener('click', ()=>{
        for(let i=1, c=counter; i<=4; i++, c++){
            loaders[i].drawing_loader.load_image(c);
        }
        counter += 4;
    });

    prev_button.addEventListener('click', ()=>{
        counter-= 2* 4;
        next_button.click();
    });


    next_button.click();
});
