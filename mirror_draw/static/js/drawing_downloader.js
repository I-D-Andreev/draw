class DrawingDownloader {
    static download(data_url, drawing_name='my_drawing.png'){
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = data_url;
        a.download = drawing_name;
        a.click();
        document.body.removeChild(a);
    }
}

export { DrawingDownloader };


