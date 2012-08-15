var Breakout = {

    numBrickRows : 5,
    numBrickCols : 5,

    // init game
    run : function() {
        this.initBricks();

        View.init();
        Events.init();

        this.intervalId = setInterval(this.update, 10);
    },

    initBricks : function() {
        this.bricks = new Array(this.numBrickRows);

        for (i=0; i < this.numBrickRows; i++) {

            this.bricks[i] = new Array(this.numBrickCols);

            for (j=0; j < this.numBrickCols; j++) {
                this.bricks[i][j] = 1;
            }
        }
    },

    update : function() {
        View.draw();
    },

    loose : function() {
        clearInterval(this.intervalId);
    },
};

// initial call
Breakout.run();
