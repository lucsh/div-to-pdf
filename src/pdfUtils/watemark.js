export default (text) => {
    let ctx, canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 170;
    ctx = canvas.getContext('2d');

    // set background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '35pt Arial';
    ctx.save();
    ctx.translate(10,150);
    ctx.rotate(-0.1*Math.PI);
    ctx.fillStyle = '#c18a8d';
    ctx.fillText(text, 0, 0);
    ctx.restore();
    return canvas.toDataURL();
};
