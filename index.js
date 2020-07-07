class Helper
{
    static getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static mouseLeftClick(evt)
    {
        let flag = false;
        evt = evt || window.event;
        if ('buttons' in evt)
        {
            flag = evt.buttons === 1;
        }
        if (!flag)
        {
            let button = evt.which || evt.button;
            flag = button === 1;
        }
        return flag;
    }
    static _timestamp()
    {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    /*
    Delete an element from an array without
    having to create a new array in the process
    to keep garbage collection at a minimum
    */
    static removeIndex(array, index)
    {
        if (index >= array.length || array.length <= 0)
        {
            return;
        }
        array[index] = array[array.length - 1];
        array[array.length - 1] = undefined;
        array.length = array.length - 1;
    }
}
class Sound
{
    constructor(src)
    {
        this.audio = new Audio(src);
    }
    play()
    {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play().then(() => {}).catch(() => {})
    }
}
class Canvas
{
    constructor(width, height)
    {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.getElementById('game-wrapper').appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
    }
}
class Background
{
    constructor(canvas, src)
    {
        this.ctx = canvas.context;
        this.img = new Image();
        this.scrollX = 0;
        this.scrollSpeed = 6;
        this.img.src = src;
    }
    draw()
    {
        // Resetting the images when the first image exits the screen
        if (this.scrollX >= this.ctx.canvas.width)
        {
            this.scrollX = 0;
        }
        // Update background X position
        this.scrollX += this.scrollSpeed;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, -this.scrollX, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, this.ctx.canvas.width - this.scrollX, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class Coin
{
    constructor(x, y, dx, dy, context)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = 70;
        this.h = 70;
        this.radius = 20;
        this.ctx = context;
        this.img = new Image();
        this.img.src = 'img/coinGold.png';
    }

    update()
    {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw()
    {
        this.ctx.drawImage(
            this.img,
            this.x, this.y,
            this.w, this.h
        )
    }

    outOfScreen()
    {
        return this.x + this.w < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height;
    }
}
class Balloon
{
    constructor(x, y, dx, dy, color, context)
    {
        this.y = y;
        this.x = x;
        this.dx = dx;
        this.dy = dy;
        this.h = 50;
        this.w = 50;
        this.radius = 25;
        this.ctx = context;
        this.img = new Image();
        this.img.src = 'img/balloon-' + color + '.png';
    }
    update()
    {
        this.x += this.dx;
        this.y += this.dy;
    }
    draw()
    {
        this.ctx.drawImage(
            this.img, //The image file
            this.x, this.y, //The destination x and y position
            this.w, this.h //The destination height and width
        );
    }
    outOfScreen()
    {
        return this.x + this.w < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height;
    }
}
class Box
{
    constructor(x, y, dx, dy, context)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = 50;
        this.h = 100;
        this.radius = 40;
        this.ctx = context;
        this.img = new Image();
        this.img.src = 'img/obstacle.jpg';
    }
    update()
    {
        this.x -= this.dx;
        this.y -= this.dy;
    }
    draw()
    {
        this.ctx.drawImage(
            this.img,
            this.x, this.y,
            this.w, this.h
        );
    }
    outOfScreen()
    {
        return this.x + this.w < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height;
    }
    collidesWith(object)
    {
        return this.distanceBetween(object) < (this.radius + object.radius);
    }
    distanceBetween(object)
    {
        return Math.sqrt(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2));
    }
}
class Spike
{
    constructor(x, y, dx, dy, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 40;
        this.w = 93;
        this.h = 36;
        this.ctx = context;
        this.img = new Image();
        this.img.src = 'img/spike.png';
    }
    update()
    {
        this.x -= this.dx;
        this.y -= this.dy;
    }
    draw()
    {
        this.ctx.drawImage(
            this.img,
            this.x, this.y,
            this.w, this.h
        )
    }
    outOfScreen()
    {
        return this.x + this.w < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height;
    }
    collidesWith(object)
    {
        return this.distanceBetween(object) < (this.radius + object.radius);
    }
    distanceBetween(object)
    {
        return Math.sqrt(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2));
    }
}
class Heart
{
    constructor(x, y, dx, dy, context)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 25;
        this.ctx = context;
        this.w = 53;
        this.h = 45;
        this.img = new Image();
        this.img.src = 'img/heart.png';
    }

    update()
    {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw()
    {
        this.ctx.drawImage(
            this.img,
            this.x, this.y,
            this.w, this.h
        )
    }

    outOfScreen()
    {
        return this.x + this.w < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height;
    }
    collidesWith(object)
    {
        return this.distanceBetween(object) < (this.radius + object.radius);
    }
    distanceBetween(object)
    {
        return Math.sqrt(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2));
    }
}
class Player
{
    constructor(x, groundY, speed, context)
    {
        this.runSprites = [
            { x: 0, y: 140, w: 68, h: 100 },
            { x: 75, y: 140, w: 68, h: 100 },
            { x: 149, y: 140, w: 71, h: 100 },
            { x: 228, y: 140, w: 69, h: 100 },
            { x: 306, y: 140, w: 68, h: 101 },
            { x: 382, y: 141, w: 68, h: 99 },
        ];
        this.jumpSprites = [
            { x: 23, y: 265, w: 65, h: 105 },
            { x: 97, y: 264, w: 78, h: 106 },
            { x: 184, y: 272, w: 78, h: 97 },
        ];
        this.groundY = groundY;
        this.ctx = context;
        this.h = 100;
        this.x = x;
        this.y = this.ctx.canvas.height - this.groundY - this.h;
        this.dy = 0;
        this.radius = 40;
        this.img = new Image();
        this.img.src = 'img/alsu.png';
        this.jumpSound = new Sound('sound/jump.mp3');
        this.timer = 0;
        this.nextFrame = 0;
        this.frameInterval = 5;
        this.jumpHeight = 22;
        this.grounded = true;
        this.gravity = 1;
    }
    update()
    {
        this.y += this.dy;
        // Gravity
        if (this.y + this.h < this.ctx.canvas.height - this.groundY)
        {
            this.dy += this.gravity;
            this.grounded = false;
        }
        else
        {
            this.dy = 0;
            this.grounded = true;
            this.y = this.ctx.canvas.height - this.groundY - this.h;
        }
    }
    draw()
    {
        if (this.grounded)
        {
            if (this.nextFrame >= this.runSprites.length)
            {
                this.nextFrame = 0;
            }
            this.ctx.drawImage(
                this.img,
                this.runSprites[this.nextFrame].x, this.runSprites[this.nextFrame].y,
                this.runSprites[this.nextFrame].w, this.runSprites[this.nextFrame].h,
                this.x, this.y,
                this.runSprites[this.nextFrame].w, this.runSprites[this.nextFrame].h
            );
            if (this.timer > this.frameInterval)
            {
                this.timer = 0;
                this.nextFrame++;
            }
            this.timer++;
        }
        else
        {
            this.ctx.drawImage(
                this.img,
                this.jumpSprites[0].x, this.jumpSprites[0].y,
                this.jumpSprites[0].w, this.jumpSprites[0].h,
                this.x, this.y,
                this.jumpSprites[0].w, this.jumpSprites[0].h
            );
        }
    }
    jump()
    {
        if (this.grounded)
        {
            this.jumpSound.play();
            this.dy = -this.jumpHeight;
            this.grounded = false;
        }
    }
    collidesWith(object)
    {
        return this.distanceBetween(object) < (this.radius + object.radius);
    }
    distanceBetween(object)
    {
        return Math.sqrt(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2));
    }
}
class Game
{
    constructor(canvas)
    {
        this.gameRunning = false;
        this.gamePaused = false;
        this.fps = 60;
        this.step = 1 / this.fps;
        this.now = 0;
        this.lastTime = Helper._timestamp();
        this.deltaTime = 0;
        this.ctx = canvas.context;
        this.background = new Background(canvas, 'img/bg.png');
        this.groundY = 84;
        this.balloonTimer = 0;
        this.coinTimer = 0;
        this.heartTimer = 0;
        this.boxTimer = 0;
        this.spikeTimer = 0;
        this.balloonColors = ['aqua', 'blue', 'green', 'pink', 'red', 'black', 'purple'];
        this.balloonColorsCopy = [...this.balloonColors];
        this.balloons = [];
        this.hearts = [];
        this.coins = [];
        this.boxes = [];
        this.spikes = [];
        this.balloonSpawnInterval = 25;
        this.heartSpawnInterval = 5000;
        this.coinSpawnInterval = 50;
        this.spikeSpawnInterval = 1200;
        this.boxSpawnInterval = 500;
        this.collectSound = new Sound('sound/collect.wav');
        this.heartCollectSound = new Sound('sound/heartCollect.mp3');
        this.coinCollectSound = new Sound('sound/coinCollect.wav')
        this.boxCollideSound = new Sound('sound/boxcollide.mp3');
        this.balloonSpeed = -5.5;
        this.coinSpeed = -6.0;
        this.heartSpeed = -9.0;
        this.player = new Player(100, this.groundY, 10, this.ctx);
        this.box = new Box(1500,300,6,0,this.ctx);
        this.spike = new Spike(1800, 365, 6, 0, this.ctx);
        this.spikeSpeed = 6;
        this.boxSpeed = 6;
        this.score = 0;
        this.life = 3;
    }
    start()
    {
        if (this.gameRunning)
        {
            return false;
        }
        document.getElementById('game-starter').style.display = 'none';
        document.getElementById('game-stats').style.display = 'block';
        this.gameRunning = true;
        this._mouseLeftClickListener();
        this._animate();
    }
    _animate()
    {
        if (this.gamePaused)
        {
            return;
        }
        this.now = Helper._timestamp();
        this.deltaTime = this.deltaTime + Math.min(1, (this.now - this.lastTime) / 1000);
        while (this.deltaTime > this.step)
        {
            this.deltaTime = this.deltaTime - this.step;
            this._create(this.step);
            this._update(this.step);
        }
        this._draw(this.deltaTime);
        this.lastTime = this.now;
        requestAnimationFrame(() => this._animate());
    }
    _create(step)
    {
        if (this.balloonTimer % this.balloonSpawnInterval === 0)
        {
            // Clone balloons again if its empty
            if (this.balloonColorsCopy.length === 0)
            {
                this.balloonColorsCopy = [...this.balloonColors];
            }
            // Get unique balloon randomly
            let randomBalloonColorIdx = Math.floor(Math.random() * this.balloonColorsCopy.length);
            let randomBalloonColor = this.balloonColorsCopy[randomBalloonColorIdx];
            // Remove current generated balloon from copy
            this.balloonColorsCopy.splice(randomBalloonColorIdx, 1);
            this.balloons.push(new Balloon(
                1000,
                Helper.getRandomInt(100, 200),
                this.balloonSpeed,
                0,
                randomBalloonColor,
                this.ctx
            ));
            this.balloonSpawnInterval = Helper.getRandomInt(100, 200);
            this.balloonTimer = 0;
        }

        if (this.heartTimer % this.heartSpawnInterval === 0)
        {
            this.hearts.push(new Heart(
                900,
                Helper.getRandomInt(180, 200),
                this.heartSpeed,
                0,
                this.ctx
            ));
            this.heartSpawnInterval = Helper.getRandomInt(5900, 6000);
            this.heartTimer = 0;
        }

        if (this.coinTimer % this.coinSpawnInterval === 0)
        {
            this.coins.push(new Coin(
                800,
                Helper.getRandomInt(70,150),
                this.coinSpeed,
                0,
                this.ctx
            ));
            this.coinSpawnInterval = Helper.getRandomInt(1700,1800);
            this.coinTimer = 0;
        }
        if (this.spikeTimer % this.spikeSpawnInterval === 0)
        {
            this.spikes.push(new Spike(
                7000,
                this.spike.y,
                this.spikeSpeed,
                this.spike.dy,
                this.ctx
            ));
            this.spikeSpawnInterval = Helper.getRandomInt(1500,1600);
            this.spikeTimer = 0;
        }
        if (this.boxTimer % this.boxSpawnInterval === 0)
        {
            this.boxes.push(new Box(
                5000,
                this.box.y,
                this.boxSpeed,
                this.box.dy,
                this.ctx
            ));
            this.boxSpawnInterval = Helper.getRandomInt(900,1000)
            this.boxTimer = 0;
        }
    }
    _update(step)
    {
        // Update player position
        this.player.update();
        // Update Balloons
        for (let i in this.balloons)
        {
            // Update balloon position
            this.balloons[i].update();
            if (this.balloons.hasOwnProperty(i) && this.player.collidesWith(this.balloons[i]))
            {
                this.collectSound.play();
                Helper.removeIndex(this.balloons, i);
                this._scoreUpdate();
            }
            // Remove the balloon if out of screen.
            if (this.balloons.hasOwnProperty(i) && this.balloons[i].x < 0)
            {
                Helper.removeIndex(this.balloons, i);
            }
        }

        for (let h in this.hearts)
        {
            // Update heart position
            this.hearts[h].update();

            if (this.hearts.hasOwnProperty(h) && this.player.collidesWith(this.hearts[h]))
            {
                this.heartCollectSound.play();
                Helper.removeIndex(this.hearts, h);
                this._heartUpdate();
            }
            // Remove the heart if out of screen.
            if (this.hearts.hasOwnProperty(h) && this.hearts[h].x < 0)
            {
                Helper.removeIndex(this.hearts, h);
            }
        }

        for (let c in this.coins)
        {
            // Update coin position
            this.coins[c].update();
            if (this.coins.hasOwnProperty(c) && this.player.collidesWith(this.coins[c]))
            {
                this.coinCollectSound.play();
                Helper.removeIndex(this.coins, c);
                this._coinUpdate();
            }
            // Remove the coin if out of screen
            if (this.coins.hasOwnProperty(c) && this.coins[c].x < 0)
            {
                Helper.removeIndex(this.coins, c);
            }
        }

        this.balloonTimer++;
        this.boxTimer++;
        this.spikeTimer++;
        this.coinTimer += 12;
        this.heartTimer += 30;
        for (let a in this.boxes)
        {
            this.boxes[a].update();

            if (this.boxes.hasOwnProperty(a) && this.player.collidesWith(this.boxes[a]))
            {
                Helper.removeIndex(this.boxes, a);
                this.boxCollideSound.play();
                this._lifeUpdate();
            }

            if (this.boxes.hasOwnProperty(a) && this.boxes[a].x < 0)
            {
                Helper.removeIndex(this.boxes, a);
            }
        }
        for (let s in this.spikes)
        {
            this.spikes[s].update();

            if (this.spikes.hasOwnProperty(s) && this.player.collidesWith(this.spikes[s]))
            {
                //this.ctx.font = "40px Impact";
                //this.ctx.fillText("Game Over!", 400, 235);
                //document.getElementById("game-over").style.display = "block";
                //throw new Error("GAME OVER!");
                Helper.removeIndex(this.spikes, s);
                this._lifeUpdate();
            }
            // Remove the balloon if out of screen.
            if (this.spikes.hasOwnProperty(s) && this.spikes[s].x < 0)
            {
                Helper.removeIndex(this.spikes, s);
            }
        }
        if (this.life === 0)
        {
            this.ctx.font = "50px Impact";
            this.ctx.fillText("Game Over!", 400, 235);
            document.getElementById("game-over").style.display = "block";
            throw new Error("GAME OVER!");
        }
    }
    _draw(dt)
    {
        this.background.draw();
        this.player.draw();
        this.box.draw();
        this.spike.draw();
        // Draw balloons
        for (let i in this.balloons)
        {
            this.balloons[i].draw();
        }
        for (let a in this.boxes)
        {
            this.boxes[a].draw();
        }
        for (let s in this.spikes)
        {
            this.spikes[s].draw();
        }
        for (let c in this.coins)
        {
            this.coins[c].draw();
        }
        for (let h in this.hearts)
        {
            this.hearts[h].draw();
        }
    }
    _mouseLeftClick(event)
    {
        if (Helper.mouseLeftClick(event))
        {
            this.player.jump();
        }
    }
    _mouseLeftClickListener()
    {
        let self = this;
        this.ctx.canvas.addEventListener('mousedown', function (event)
        {
            self._mouseLeftClick(event);
        });
    }
    _scoreUpdate()
    {
        document.getElementById('game-score').innerText = '' + ++this.score;
    }

    _lifeUpdate()
    {
        document.getElementById('game-life').innerText = '' + --this.life;
    }

    _coinUpdate()
    {
        document.getElementById('game-score').innerText = '' + ++this.score;
        document.getElementById('game-score').innerText = '' + ++this.score;
    }

    _heartUpdate()
    {
        document.getElementById('game-life').innerText = '' + ++this.life;
    }

}
let canvas = new Canvas(950, 500);
let game = new Game(canvas);