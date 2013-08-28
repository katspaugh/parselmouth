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
    var framesPerMove = 5;
    var frameCycle = 0;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var unit = ~~(Math.max(w, h) / 40);
    var maxPoint = {
        x: ~~(w / unit) * unit,
        y: ~~(h / unit) * unit
    };
    var drawer = new Drawer(maxPoint, unit);
    var snake, dir, tail, gameover;

    var init = function () {
        snake = new Snake(maxPoint, unit);
        dir = { x: snake.direction.x, y: snake.direction.y };
        tail = snake.tail.slice();
        gameover = false;
    };

    init();

    loop(function () {
        snake.setDirection(dir);

        if (frameCycle == 0) {
            tail = snake.tail.slice();
            gameover = snake.update();
        }

        drawer.clear();
        drawer.drawApple(snake.apple);
        drawer.drawSnakeFrame(tail, snake.tail, frameCycle, framesPerMove);

        if (gameover && frameCycle == framesPerMove - 1) {
            if (confirm('Gameover! Play again?')) {
                init();
            } else {
                return false;
            }
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