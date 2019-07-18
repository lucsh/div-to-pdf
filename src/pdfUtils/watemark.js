export default (text) => {
    let ctx, canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 200;
    ctx = canvas.getContext('2d');

    // set background
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '60pt Arial';
    ctx.save();
    ctx.translate(50,200);
    ctx.rotate(-0.1*Math.PI);
    ctx.fillStyle = '#c18a8d';
    ctx.fillText(text, 0, 0);
    ctx.restore();
    return canvas.toDataURL();
};
