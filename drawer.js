'use strict';

function Drawer(maxPoint, unit) {
    this.width = maxPoint.x;
    this.height = maxPoint.y;
    this.unit = unit;
    this.ctx = this.initCanvas();
}

Drawer.prototype.initCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
};

Drawer.prototype.clear = function () {
    this.ctx.fillStyle = 'beige';
    this.ctx.fillRect(0, 0, this.width, this.height);
};

Drawer.prototype.drawApple = function (point) {
    var r = this.unit / 2;
    var x = point.x;
    var y = point.y;
    var rad = this.ctx.createRadialGradient(x, y, 1, x, y, r);
    rad.addColorStop(0.5, 'yellow');
    rad.addColorStop(1.0, 'red');
    this.ctx.fillStyle = rad;
    this.ctx.beginPath();
    this.ctx.arc(point.x + r, point.y + r, r, 0, Math.PI * 2, false);
    this.ctx.fill();
};

Drawer.prototype.ease = function (t, b, c, d) {
    return c * t / d + b;
};

Drawer.prototype.drawSnakeFrame = function (pointsA, pointsB, frame, frames) {
    pointsA.forEach(function (pA, index) {
        var pB = pointsB[index];
        var dx = pB.x - pA.x;
        var dy = pB.y - pA.y;
        var x = pA.x, y = pA.y;
        if (dx) {
            x = this.ease(frame, x, dx, frames);
        }
        if (dy) {
            y = this.ease(frame, y, dy, frames);
        }
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x, y, this.unit, this.unit);
    }, this);
};