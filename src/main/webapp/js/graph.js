const canvas=document.getElementById('graph'),
    ctx=canvas.getContext('2d');
canvas.height = canvas.width;

let w = canvas.width, h = canvas.height;
const hatchWidth = 5, baseHatchGap=30;


let hatchGap = 40;
let rValue = 1;
// print graph
function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
// draw x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();


//draw print y axis

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();



//draw single segments

    ctx.beginPath();

    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    // window.alert("message");
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);

    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

//draw shaded area
    ctx.fillStyle = 'rgba(80,92,236,0.33)';
    ctx.beginPath();
    ctx.moveTo(w / 2 + 2 * hatchGap, h / 2);
    ctx.lineTo(w / 2 + 2 * hatchGap, h / 2 - 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2 - 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2);
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, h / 2, hatchGap, 0, 1 / 2 * Math.PI);


    ctx.moveTo(w / 2, h / 2 - hatchGap);
    ctx.lineTo(w / 2 - hatchGap, h / 2);
    ctx.lineTo(w / 2, h / 2);


    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();


    const axisFontSize = baseHatchGap / 2;
    let letterFontSize = hatchGap / 3;

    ctx.fillStyle = 'black';

    ctx.font = `500 ${axisFontSize * 1.4}px Roboto`;
    ctx.fillText('y', w / 2 - hatchWidth * 4.3, 15)
    ctx.fillText('x', w - 20, h / 2 - hatchWidth * 2.8)


    ctx.font = `800 ${letterFontSize}px Roboto`;
    ctx.fillText('R/2', w / 2 + hatchGap - 8, h / 2 + hatchWidth * 3.2);
    ctx.fillText('R', w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 3.2);
    ctx.fillText('-R/2', w / 2 - hatchGap - 12, h / 2 + hatchWidth * 3.2);
    ctx.fillText('-R', w / 2 - hatchGap * 2 - 8, h / 2 + hatchWidth * 3.2);

    ctx.fillText('R/2', w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText('R', w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText('-R/2', w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText('-R', w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);

}
function drawPointOnGraph(xCenter, yCenter, isHit) {

    ctx.fillStyle = isHit ? 'ForestGreen' : 'red'
    let x = w / 2 + xCenter * hatchGap * (2 / rValue) - 3;
    let y = h / 2 - yCenter * hatchGap * (2 / rValue) - 3;
    ctx.fillRect(x, y, hatchGap/10, hatchGap/10);
}

function getMousePosition(e) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    let mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

canvas.addEventListener('click', (event) => {
    removeValidation();
    if (checkSelection(rOptions)&&!isNaN(rValue)) {
        const x = getMousePosition(event).x;
        const y = getMousePosition(event).y;
        const xCenter = Math.round((x - w/2) / (hatchGap * (2/rValue))*1000)/1000,
            yCenter = Math.round((h/2 - y) / (hatchGap * (2/rValue))*1000)/1000;
        console.log(xCenter, yCenter);

        if(xCenter>3||xCenter<-5) {
            alert("x coordinate out of range(-5,3)");
            return;
        }
        if(yCenter>5||yCenter<-5) {
            alert("y coordinate out of range(-5,5)");
            return;
        }
        const params = {
            'x_coordinate' : xCenter,
            'y_coordinate': yCenter,
            'r_coordinate': rValue,
            'timezone': new Date().getTimezoneOffset()
        }

        window.location.replace("controller" + formatParams(params));
    } else {
        alert("Error: R field is incorrect!")
    }
});