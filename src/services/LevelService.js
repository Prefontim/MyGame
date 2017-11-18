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
            enemyInterval: 5,
            maxEnemies: 3
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
    }

    function launchEnemies() {
        launchEnemy();
        setInterval(maybeLaunchEnemy, currConfig.enemyInterval * 1000);
        //launchEnemy();
    }

    function maybeLaunchEnemy() {
        if(enemies.length < currConfig.maxEnemies) {
            launchEnemy();
        }
    }

    function launchEnemy() {
        /*
        types
         */
        let x = Math.random() * (CONSTANTS.STAGE_WIDTH / 2) + 200;
        let y = (Math.random()) * 300 + 100;
        let enemy = EnemyFactory.getEnemy('zombie', {startCoord: {x: x, y: y}});

        enemy.on('destroy', () => {
            _.remove(enemies, currEnemy => {
                return currEnemy.id === enemy.id;
            });
        });

        enemy.beginMovement();

        enemies.push(enemy);
    }

    return {
        loadLevel: loadLevel
    }

}
