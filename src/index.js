require('./style.css');
import config from './config';
import CONSTANTS from './constants';
import Gun from './objects/gun';
import helper from './services/CreateJSHelper';
import LevelService from './services/LevelService';

function init() {

    var stage = helper.getStage();
    buildArena();
    LevelService.loadLevel(1);
    loadGun();



    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

}

function buildArena() {
    var stage = helper.getStage();
    var field = new createjs.Shape();
    field.graphics.beginStroke("black").drawRect(0, 0, config.stageSize.w, CONSTANTS.FIELD_HEIGHT);
    stage.addChild(field);

    var overlook = new createjs.Shape();
    overlook.graphics.beginStroke("red").drawRect(0, CONSTANTS.FIELD_HEIGHT, config.stageSize.w, CONSTANTS.OVERLOOK_HEIGHT);
    stage.addChild(overlook);

    stage.update();
}

function loadGun() {
    new Gun({x: CONSTANTS.STAGE_WIDTH / 2, y: CONSTANTS.STAGE_HEIGHT - 40});
}

window.addEventListener('load', function () {
    setTimeout(function() {
        init();
    }, 1000);
}, true);
