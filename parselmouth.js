'use strict';

function loop(callback, msPerFrame) {
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
    var framesPerMove = 5;
    var frameCycle = 0;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var unit = ~~(Math.max(w, h) / 40);
    var maxPoint = {
        x: ~~(w / unit) * unit,
        y: ~~(h / unit) * unit
    };
    var snake = new Snake(maxPoint, unit);
    var drawer = new Drawer(maxPoint, unit);
    var dir = { x: snake.direction.x, y: snake.direction.y };
    var tail;

    loop(function () {
        if (snake.direction.x != -dir.x || snake.direction.y != -dir.y) {
            snake.direction.x = dir.x;
            snake.direction.y = dir.y;
        }

        if (0 == frameCycle) {
            tail = snake.tail.slice();
            var ok = snake.update();

            if (!ok) {
                if (confirm('Gameover! Play again?')) {
                    snake = new Snake(maxPoint, unit);
                    tail = snake.tail.slice();
                } else {
                    return false;
                }
            }
        } else {
            drawer.clear();
            drawer.drawApple(snake.apple);
            drawer.drawSnakeFrame(tail, snake.tail, frameCycle, framesPerMove);
        }

        frameCycle = (frameCycle + 1) % framesPerMove;

        return true;
    });

    bindKeys(function (x, y) {
        dir.x = x;
        dir.y = y;
    });
}

function bindKeys(callback) {
    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            /* ← */
            case 37: return callback(-1, 0);
            /* ↑ */
            case 38: return callback(0, -1);
            /* → */
            case 39: return callback(1, 0);
            /* ↓ */
            case 40: return callback(0, 1);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
//document.addEventListener('click', init);