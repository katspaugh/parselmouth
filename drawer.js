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
    this.ctx.fillStyle = 'red';
    this.drawUnit(point);
};

Drawer.prototype.drawUnit = function (point) {
    this.ctx.fillRect(point.x, point.y, this.unit, this.unit);
};

Drawer.prototype.ease = function (t, b, c, d) {
    // return c*t/d+b;
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

Drawer.prototype.drawSnakeFrame = function (pointsA, pointsB, frame, frames) {
    this.ctx.fillStyle = 'green';

    pointsA.forEach(function (pA, index) {
        var pB = pointsB[index];

        var x = pA.x;
        var y = pA.y;
        if (x != pB.x) {
            x = this.ease(frame, x, pB.x - x, frames + 1);
        }
        if (y != pB.y) {
            y = this.ease(frame, y, pB.y - y, frames + 1);
        }

        this.drawUnit({ x: x, y: y });
    }, this);
};