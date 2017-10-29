let instance = null;
let stage = null;

function GameService() {


    this.initGame = function () {
        stage = new createjs.Stage("demoCanvas");
    }

    return {
        stage: stage,

    }
}



if(!instance) {
    instance = new GameService();
}
module.exports = GameService;
