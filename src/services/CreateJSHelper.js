var stage = null;

//setTimeout(function() { //FIXME - don't use a timeout to do this
//     if(!stage) {
//         stage = new createjs.Stage("demoCanvas");
//     }
//}, 1000);


var CreateJSHelper = {
    getStage: () => {
        if(!stage) {
            stage = new createjs.Stage("demoCanvas");
        }
        return stage;
    }
}

export default CreateJSHelper;
