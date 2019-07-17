import bwipjs from 'bwip-js';

export default (toRender, type) => {
    const canvas = document.createElement('canvas');
    const opciones = {
        bcid: type, // Barcode type
        text: toRender, // Text to encode
        scaleX: 1,
        paddingwidth: 0,
        paddingheight: 0,
        includetext: false, // Falso porque nec. dependencias y se puede resolver solo con pdfmake
    };

    bwipjs(canvas, opciones, (err, cvs) => {
        if (err) {
            console.error(err);
        } else {
            return canvas.toDataURL('image/png');
        }
    });
    return canvas.toDataURL('image/png');
};
