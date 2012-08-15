var View = {

    x  : 150,
    y  : 150,
    dx : 2,
    dy : 4,

    canvasMinX : 0,
    canvasMaxX : 0,

    brickWidth   : 0,
    brickHeight  : 15,
    brickPadding : 1,

    paddle : {
        x : 0,
        h : 10,
        w : 75
    },

    ballRadius  : 10,
    rowColors   : ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"],
    paddleColor : "#FFFFFF",
    ballColor   : "#FFFFFF",
    backColor   : "#000000",

    rightDown : false,
    leftDown  : false,

    init : function() {
        this.canvas     = document.getElementById('canvas');
        this.context    = this.canvas.getContext('2d');
        this.paddle.x   = this.canvas.width / 2;
        this.canvasMinX = 0;
        this.canvasMaxX = this.canvasMinX + this.canvas.width;
        this.brickWidth = (this.canvas.width/Breakout.numBrickCols) - 1;
        this.draw();
    },

    clear : function() {
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    },

    drawBall : function(x, y, r, c) {
        this.context.beginPath();
        this.context.fillStyle = c;
        this.context.arc(x, y, r, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.fill();
    },

    drawRect : function(x, y, w, h, c) {
        this.context.beginPath();
        this.context.fillStyle = c;
        this.context.rect(x,y,w,h);
        this.context.closePath();
        this.context.fill();
    },

    drawPaddle : function() {
        if (this.rightDown) {
            this.paddle.x += 5;
        }
        else if (this.leftDown) {
            this.paddle.x -= 5;
        }

        if (this.paddle.x <= View.canvasMinX) {
            this.paddle.x = View.canvasMinX
        }

        if (this.paddle.x >= View.canvasMaxX-View.paddle.w) {
            this.paddle.x = View.canvasMaxX-View.paddle.w;
        }

        this.drawRect(
            this.paddle.x,
            this.canvas.height - this.paddle.h,
            this.paddle.w,
            this.paddle.h,
            this.paddleColor
        );
    },

    drawBricks : function() {
        for (i=0; i < Breakout.numBrickRows; i++) {

            for (j=0; j < Breakout.numBrickCols; j++) {

                if (Breakout.bricks[i][j] == 1) {
                    this.drawRect(
                        (j * (this.brickWidth + this.brickPadding)) + this.brickPadding,
                        (i * (this.brickHeight + this.brickPadding)) + this.brickPadding,
                        this.brickWidth,
                        this.brickHeight,
                        this.rowColors[i]);
                }
            }
        }
    },

    validateBall : function() {
        // changes direction of the ball on corner/canvas borders
        if (this.x + this.dx > this.canvas.width || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < 0) {
            this.dy = -this.dy;
        // ball reaches y border
        } else if (this.y + this.dy > this.canvas.height) {
            // hits paddle
            if (this.x > this.paddle.x && this.x < this.paddle.x + this.paddle.w) {
                this.dy = -this.dy;
            } else {
                // game over, so stop the animation
                Breakout.loose();
            }
        }

        this.x += this.dx;
        this.y += this.dy;

    },

    hitBrick : function() {
        rowHeight = this.brickHeight + this.brickPadding;
        colWidth  = this.brickWidth + this.brickPadding;

        row = Math.floor(this.y / rowHeight);
        col = Math.floor(this.x / colWidth);

        // if so, reverse the ball and mark the brick as broken
        if (this.y < Breakout.numBrickRows * rowHeight &&
            row >= 0 && col >= 0 &&
            Breakout.bricks[row][col] == 1
        ) {
            this.dy = -this.dy;
            Breakout.bricks[row][col] = 0;
        }
    },

    draw : function() {
        this.clear();

        this.drawBall(
            this.x,
            this.y,
            this.ballRadius,
            this.ballColor
        );

        this.validateBall();
        this.hitBrick();

        this.drawPaddle();
        this.drawBricks();
    },
};
