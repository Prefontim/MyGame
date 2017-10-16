require('./style.css');

function init() {
    console.log(createjs);
    var stage = new createjs.Stage("demoCanvas");
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#59B100").drawRect(0, 0, 500, 200);

    stage.on('click', function(evt) {
        console.log('evt', evt);


        var ball = new createjs.Shape();

        ball.graphics.beginFill('orange').drawCircle(0, 0, 20, 20);
        ball.set({visible: false});
        stage.addChild(ball);
        stage.update();
        var cnt = 0;
        setTimeout(function() {
            ball.set({visible: true, x: 250, y: 250});
           // stage.update();
        //
             createjs.Tween.get(ball).to({x: evt.stageX, y: evt.stageY, scaleX:.3, scaleY: .3}, 700, createjs.Ease.quadOut);
        //
         }, 1);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);


        //stage.update();
    });

    stage.addChild(shape);

    stage.update();



}

var stage = {
    w: 500,
    h: 300
};

function abs(shape, x, y) {
    return {
        x: stage.w - shape.x + x,
        y: stage.h - shape.y + y
    };
}

function handleClick(event){
    console.log('event', event);
    // Click happenened
}

setTimeout(function() {
    init();
}, 1000);
