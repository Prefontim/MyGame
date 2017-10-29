import Enemy from '../objects/enemy';

function EnemyFactory() {

    function getEnemy() {
        return new Enemy();
    }
    return {
        getEnemy: getEnemy
    };
}

export default EnemyFactory();
