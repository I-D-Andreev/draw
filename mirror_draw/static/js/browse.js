import { DrawingLoaderID } from './drawing_loader_with_ID.js'

window.addEventListener('load', () => {
    console.log('Number of drawings: ' + num_drawings);

    // pad 0th element so that array index matches html elements id
    let loaders = [null];
    let counter = 1;
    let loaded_all = false; // whether we have loaded the last drawing in the DB

    let next_button = document.getElementById('next_button');
    let prev_button = document.getElementById('prev_button');



    for (let i = 1; i <= 4; i++) {
        let id_field = document.getElementById('id_label_' + i);
        let img = document.getElementById('drawing_' + i);
        loaders.push(new DrawingLoaderID(img, id_field));
    }


    next_button.addEventListener('click', () => {
        if (!loaded_all) {
            for (let i = 1, c = counter; i <= 4; i++, c++) {
                if (c < num_drawings) {
                    loaders[i].drawing_loader.load_image(c);
                } else if (c == num_drawings) {
                    loaders[i].drawing_loader.load_image(c);
                    loaded_all = true;
                } else {
                    loaders[i].img.src = '';
                    loaders[i].id_label.innerHTML = c;
                }
            }
            counter += 4;
        }
    });

    prev_button.addEventListener('click', () => {
        if (counter > 5) {
            loaded_all = false;
            counter -= 2 * 4;
            next_button.click();
        }
    });


    next_button.click();
});
