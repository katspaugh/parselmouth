'use strict';

function Snake(maxPoint, unit, speed) {
    this.initialLength = 3;
    this.maxPoint = maxPoint;
    this.unit = unit;
    this.gain = unit / speed;
    this.direction = this.LEFT;
    this.tail = [{
        x: this.round(maxPoint.x / 2),
        y: this.round(maxPoint.y / 2),
        direction: { x: this.direction.x, y: this.direction.y }
    }];
    for (var i = 0; i < this.initialLength - 1; i++) {
        this.grow();
    }
    this.apple = this.findApple();
}

Snake.prototype.LEFT = { x: -1, y: 0 };
Snake.prototype.RIGHT = { x: 1, y: 0 };
Snake.prototype.UP = { x: 0, y: -1 };
Snake.prototype.DOWN = { x: 0, y: 1 };

Snake.prototype.getTailLength = function () {
    return this.tail.length - this.initialLength;
};

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

Snake.prototype.round = function (val) {
    return Math.round(val / this.unit) * this.unit;
};

Snake.prototype.collide = function (point) {
    var p = this.tail[0];
    return p != point &&
        Math.round(p.x) == Math.round(point.x) &&
        Math.round(p.y) == Math.round(point.y);
};

Snake.prototype.canEat = function (apple) {
    return this.collide(apple);
};

Snake.prototype.steer = function (dir) {
    var first = this.tail[0];
    if (dir.x != -first.direction.x && dir.y != first.direction.y) {
        this.direction = dir;
    }
};

Snake.prototype.move = function () {
    this.tail.forEach(function (part) {
        part.x += part.direction.x * this.gain;
        part.y += part.direction.y * this.gain;
    }, this);
};

Snake.prototype.wrap = function () {
    this.tail.forEach(function (part) {
        var x = this.round(part.x);
        var y = this.round(part.y);

        if (x < 0) {
            part.x = this.maxPoint.x - this.unit;
        } else if (x + this.unit > this.maxPoint.x) {
            part.x = -this.unit;
        }
        if (y < 0) {
            part.y = this.maxPoint.y - this.unit;
        } else if (y + this.unit > this.maxPoint.y) {
            part.y = -this.unit;
        }
    }, this);
};

Snake.prototype.setDirections = function () {
    for (var i = this.tail.length - 1; i > 0; i--) {
        var part = this.tail[i];
        var next = this.tail[i - 1];
        part.direction.x = next.direction.x;
        part.direction.y = next.direction.y;
    }
    var first = this.tail[0];
    first.direction.x = this.direction.x;
    first.direction.y = this.direction.y;
};

Snake.prototype.grow = function () {
    var last = this.tail[this.tail.length - 1];
    this.tail.push({
        x: last.x - this.unit * last.direction.x,
        y: last.y - this.unit * last.direction.y,
        direction: {
            x: last.direction.x,
            y: last.direction.y
        }
    });
};

Snake.prototype.update = function (dir) {
    this.move();

    var first = this.tail[0];
    if (
        Math.round(first.x) % this.unit != 0 ||
        Math.round(first.y) % this.unit != 0
    ) {
        return;
    }
    this.wrap();
    this.setDirections();

    if (this.canEat(this.apple)) {
        this.grow();
        this.apple = this.findApple();
    }

    if (this.tail.some(this.collide, this)) {
        return 'gameover';
    }
};