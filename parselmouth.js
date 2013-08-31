'use strict';

function loop(callback) { // TODO: frame cycle
    var requestFrame = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame
    ).name;
    (function frame() {
        if (callback()) {
            window[requestFrame](frame);
        }
    }());
}

function init() {
    var size = 30;
    var speed = 5;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var unit = ~~(Math.max(w, h) / size);
    var maxPoint = {
        x: ~~(w / unit) * unit,
        y: ~~(h / unit) * unit
    };
    var drawer = new Drawer(maxPoint, unit);
    var snake = new Snake(maxPoint, unit, speed);

    loop(function () {
        drawer.clear();
        drawer.drawApple(snake.apple);
        drawer.drawSnake(snake.tail, snake.direction);

        var state = snake.update();
        if ('gameover' == state) {
            if (confirm('Gameover! Play again?')) {
                snake = new Snake(maxPoint, unit, speed);
            } else {
                return false;
            }
        }

        return true;
    });

    bindKeys({
        37: snake.LEFT,
        38: snake.UP,
        39: snake.RIGHT,
        40: snake.DOWN
    }, function (direction) {
        snake.steer(direction);
    });
}

function bindKeys(keymap, callback) {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode in keymap) {
            e.preventDefault();
            callback(keymap[e.keyCode]);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);