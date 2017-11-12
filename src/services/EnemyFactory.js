import Enemy from '../objects/enemy';
import Enemy2 from '../enemies/enemy';
import Zombie from '../enemies/zombie';
import {canMove} from '../behaviors';
import VerticalMovementPattern from '../objects/VerticalMovementPattern';

function EnemyFactory() {

    function getEnemy(type, {startCoord}) {
        if(type === 'test') {
            let mp = new VerticalMovementPattern(startCoord); //or 'manual' for no movement
            let enemy = new Enemy({startCoord: startCoord, movementPattern: mp}); //FIXME - use constant
            mp.shape = enemy.enemyShape;
            return enemy;
        } else if(type === 'zombie') {
            let movePattern = new VerticalMovementPattern(startCoord, {
                movement: {
                    x: 0,
                    y: 100,
                    velocity: 100
                },
                repeat: false,
                interval: 3000
            }); //or 'manual' for no movement
            let baseEnemy = Enemy2({startCoord: startCoord, image: 'zombie_male', movePattern: movePattern});
            let zombie = Object.assign({}, baseEnemy, canMove(baseEnemy, movePattern));
            movePattern.obj = zombie;
            return zombie;
        }

    }
    return {
        getEnemy: getEnemy
    };
}

export default EnemyFactory();
