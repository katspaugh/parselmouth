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
    this.ctx.fillRect(point.x, point.y, this.unit, this.unit);
};

Drawer.prototype.drawSnake = function (points, direction) {
    points.forEach(function (point) {
        var x = Math.round(point.x);
        var y = Math.round(point.y);
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x, y, this.unit, this.unit);
    }, this);

    var dotSize = this.unit / 10;
    var a1 = (this.unit / 2) - dotSize;
    var a2 = (this.unit / 2) + dotSize;
    var b1 = dotSize * 3;
    var b2 = this.unit - b1;
    var x1, y1, x2, y2;
    var p = points[0];
    var dir = p.direction;

    // TODO: learn linear algebra
    if (dir.x == -1) {
        x1 = b1;
        y1 = a1;
        x2 = b1;
        y2 = a2;
    } else if (dir.x == 1) {
        x1 = b2;
        y1 = a1;
        x2 = b2;
        y2 = a2;
    } else if (dir.y == -1) {
        x1 = a1;
        y1 = b1;
        x2 = a2;
        y2 = b1;
    } else if (dir.y == 1) {
        x1 = a1;
        y1 = b2;
        x2 = a2;
        y2 = b2;
    }

    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(p.x + x1, p.y + y1, dotSize, dotSize);
    this.ctx.fillRect(p.x + x2, p.y + y2, dotSize, dotSize);
};