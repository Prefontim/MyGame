import helper from './CreateJSHelper';
import CONSTANTS from '../constants';
import EnemyFactory from './EnemyFactory';
import _ from 'lodash';
let instance = null;

export default (function() {
    if(!instance) {
        instance = new LevelService();
    }
    return instance;
})();



function LevelService() {
    const levelConfig = [
        {
            color: 'green',
            enemyInterval: 5
        }
    ];

    let enemies = [];

    let currConfig = null;
    let currentLevel = 0;

    function loadLevel(level) {
        currConfig = levelConfig[level - 1];
        var stage = helper.getStage();
        var field = new createjs.Shape();
        field.graphics.beginFill(currConfig.color).drawRect(0, 0, CONSTANTS.STAGE_WIDTH, CONSTANTS.FIELD_HEIGHT);
        stage.addChild(field);
        stage.update();

        launchEnemies();

        watchForHits();
    }

    function launchEnemies() {
        setInterval(launchEnemy, currConfig.enemyInterval * 1000);
    }

    function launchEnemy() {
        let enemy = EnemyFactory.getEnemy();
        var x = Math.random() * CONSTANTS.STAGE_WIDTH;
       // x = 500;
        enemy.getShape().set({visible: true, x: x, y: 10});
        enemy.x = Math.random() * CONSTANTS.STAGE_WIDTH;
        enemy.y = 10;

        var stage = helper.getStage();
        stage.update();
        enemy.beginMovement();
        enemies.push(enemy);
    }

    function watchForHits() {
        setInterval(function() {
            _.each(enemies, function (enemy) {

            })
        });
    }

    return {
        loadLevel: loadLevel
    }

}
