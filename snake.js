'use strict';

function Snake(maxPoint, unit) {
    this.direction = { x: -1, y: 0 };
    this.prevDir = {};
    this.maxPoint = maxPoint;
    this.unit = unit;
    this.tail = [{
        x: ~~((maxPoint.x / unit) / 2) * unit,
        y: ~~((maxPoint.y / unit) / 2) * unit
    }];
    this.move();
    this.move();
    this.apple = this.findApple();
}

Snake.prototype.findApple = function () {
    var $ = this.unit;
    do {
        var apple = {
            x: ~~((this.maxPoint.x / $) * Math.random()) * $,
            y: ~~((this.maxPoint.y / $) * Math.random()) * $
        };
    } while (this.canEat(apple));
    return apple;
};

Snake.prototype.border = function () {
    var head = this.tail[0];
    var mP = this.maxPoint;
    return head.x < 0 || head.y < 0 ||  head.x >= mP.x || head.y >= mP.y;
};

Snake.prototype.collide = function (point) {
    var p = this.tail[0];
    return p != point && p.x == point.x && p.y == point.y;
};

Snake.prototype.canEat = function (apple) {
    return this.collide(apple);
};

Snake.prototype.move = function () {
    var x = this.tail[0].x + this.direction.x * this.unit;
    var y = this.tail[0].y + this.direction.y * this.unit;
    this.tail.unshift({ x: x, y: y });
};

Snake.prototype.update = function () {
    this.prevDir.x = this.direction.x;
    this.prevDir.y = this.direction.y;

    this.move();

    if (this.canEat(this.apple)) {
        this.apple = this.findApple();
    } else {
        this.tail.pop();
    }

    return this.border() || this.tail.some(this.collide, this);
};

Snake.prototype.setDirection = function (dir) {
    if (this.prevDir.x != -dir.x || this.prevDir.y != -dir.y) {
        this.direction.x = dir.x;
        this.direction.y = dir.y;
    }
};