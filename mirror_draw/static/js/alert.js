class Alert {
    static show_alert(text, colour, wait_time=0.75) {
        let d = document.createElement('div');
        d.style.backgroundColor = colour;
        d.style.width = '100%';
        d.style.height = '6%';
        d.style.position = 'absolute';
        d.style.top = '0px';
        d.style.textAlign = 'center';
        d.style.verticalAlign = 'middle';
        d.style.opacity = '1';

        d.classList.add('center_text_span');

        let t = document.createTextNode(text);
        d.appendChild(t);

        document.getElementsByTagName('body')[0].appendChild(d);
        setTimeout(this.p_fade_out.bind(this), wait_time * 1000, d, 40 ,3);
    }

    static p_fade_out(elem, times, seconds) {
        let step = 1 / times;
        let intrvl = (seconds * 1000) / times;

        for (let i = 1; i <= times; i++) {
            setTimeout(this.p_calculate, i*intrvl, elem, step, i , times);
        }

    }

    static p_calculate(elem, step, i , times) {
        let opac = Number(elem.style.opacity);
        opac = Math.max(0, opac - step);
        elem.style.opacity = String(opac);

        // added in the cases where opacity may be slightly bigger than 0 due to double inprecision
        if(i == times){
            document.getElementsByTagName('body')[0].removeChild(elem);
        }
    }
}

export { Alert };


