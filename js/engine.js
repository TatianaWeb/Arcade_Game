// Canvas and variables

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        id;        

    const modal = document.querySelector('.modal_bg');
    const replay = document.querySelector(newPlay());

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

// Game loop
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        
        replay.addEventListener('click', function() {
            modal.classList.toggle('hide');
            player.reset();
            player.victory = false;
            win.requestAnimationFrame(main);
        });    

        if (player.victory === true) {
            win.cancelAnimationFrame(id);
            modal.classList.toggle('hide');
        }
        else {
            id = win.requestAnimationFrame(main);
        }
    }
// Initial setup
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

// Update allEnemies
    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
           enemy.update(dt);
        });
        player.update();
    }

// Loop the game engine
    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

// Clear existin canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
    }

// Load all of the images
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-princess-girl.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);

function newPlay() {
    return '.modal_button';
}

