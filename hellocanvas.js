'use strict';

var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;


// The state of the world.

var circleX = width/2;
var circleY = height/2;
var circleR = 20;

function update() {
    circleX += 10;
    circleY += 5;
    circleX %= width;
    circleY %= height;
}


// Redraw the canvas according to the current state of things.

function redraw() {
    ctx.clearRect(0, 0, width, height);
    if (distanceSquared(circleX, circleY, mouseX, mouseY) < circleR*circleR)
        ctx.fillStyle = 'red';
    else
        ctx.fillStyle = 'black';
    fillCircle(circleX, circleY, circleR);
}

function distanceSquared(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    return dx*dx + dy*dy;
}

function fillCircle(x, y, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}


// Track the mouse.

var mouseX = 0;
var mouseY = 0;

var canvasBounds = canvas.getBoundingClientRect();

function onMousemove(event) {
    mouseX = event.clientX - canvasBounds.left;
    mouseY = event.clientY - canvasBounds.top;
    redraw();
}


// Magic: we want to use requestAnimationFrame but it isn't supported on older 
// browsers. See https://github.com/darius/requestAnimationFrame for a fancier
// shim.

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
}


// Start things going.

function onLoad() {
    canvas.addEventListener('mousemove', onMousemove);
    requestAnimationFrame(run);
}

function run() {
    update();
    redraw();
    requestAnimationFrame(run); // Keep running.
}
