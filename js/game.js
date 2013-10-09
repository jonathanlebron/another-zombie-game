// Copyright 2013 Jonathan Lebron
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var stage,
    resources = ["world", "world2", "worldWalls","cloud", "cloud2", "hero"],
    resourcesLoaded = 0,
    totalResources = resources.length,
    loader,
    fps = 30,
    animationSpeed = .2,
    hero,
    cloud,
    cloud2;

function playAZG(){
    stage = new createjs.Stage("world");

    manifest = [];

    for (var i=0; i<totalResources; i++){
    	var resource = resources[i];
    	manifest.push({id: resource, src:"images/"+resource+".png"});
    }

    // load resources
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", startGame); //start game on completion
    loader.loadManifest(manifest);
}

function startGame(){
	// create background
    // world.jpg edited from http://www.spriters-resource.com/game_boy_advance/narutorpg/sheet/14388/
    var background = new createjs.Bitmap(loader.getResult("world"));
    background.x = 0;
    background.y = 0;

    // create player from sprite sheet
    var spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("hero")],
        frames: {width:28, height:42},
        animations: {
            downLeft:[0],
            up:[1],
            upLeft: [2],
            left: [3],
            down: [4],
            runLeft: [5, 10, "runLeft", animationSpeed],
            runRight: [11, 16, "runRight", animationSpeed],
            runUpLeft: [17, 23, "runUpLeft", animationSpeed],
            runUpRight: [24, 30, "runUpRight", animationSpeed],
            runUp: [31, 36, "runUp", animationSpeed],
            runDownLeft: [37, 42, "runDownLeft", animationSpeed],
            runDownRight: [43, 48, "runDownRight", animationSpeed],
            runDown: [49, 54, "runDown", animationSpeed]
        }
    });

    hero = new createjs.Sprite(spriteSheet, "runDown");
    hero.x = 430;
    hero.y = 375;
    hero.vX = 0;
    hero.vY = 0;
    hero.prevAnimation = "down";
    hero.currAnimation = "down";
    hero.speed = 75;

    // create clouds
    cloud = new createjs.Bitmap(loader.getResult("cloud"));
    cloud.x = 0;
    cloud.y = 0;
    cloud2 = new createjs.Bitmap(loader.getResult("cloud2"));
    cloud2.x = -stage.canvas.width;
    cloud2.y = 0;
    cloud.speed = cloud2.speed = 25

    // add everything to the stage
    stage.addChild(background, hero, cloud, cloud2);

    // start main game loop
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(fps);
}

function loop(event){
    redraw(event.delta/1000);
    stage.update(event);
}

function redraw(dt) {
    // animate clouds
    if (cloud.x > stage.canvas.width)
    	cloud.x = -stage.canvas.width;

    if (cloud2.x > stage.canvas.width)
    	cloud2.x = -stage.canvas.width;

    cloud.x += dt*cloud.speed;
    cloud2.x += dt*cloud2.speed;

    hero.xV = hero.yV = 0 //reset velocity

    // handle key input
    if(keydown.up && keydown.left) {
    	hero.yV -= hero.speed;
        hero.xV -= hero.speed;
        hero.currAnimation = "runUpLeft";
    } else if(keydown.up && keydown.right) {
    	hero.yV -= hero.speed;
        hero.xV += hero.speed;
        hero.currAnimation = "runUpRight";
    } else if(keydown.down && keydown.left) {
    	hero.yV += hero.speed;
        hero.xV -= hero.speed;
        hero.currAnimation = "runDownLeft";
    } else if(keydown.down && keydown.right) {
    	hero.yV += hero.speed;
        hero.xV += hero.speed;
        hero.currAnimation = "runDownRight";
    } else if(keydown.left) {
        hero.xV -= hero.speed;
        hero.currAnimation = "runLeft";
    } else if(keydown.right) {
        hero.xV += hero.speed;
        hero.currAnimation = "runRight";
    } else if(keydown.up) {
        hero.yV -= hero.speed;
        hero.currAnimation = "runUp";
    } else if(keydown.down) {
        hero.yV += hero.speed;
        hero.currAnimation = "runDown";
    }

    /*
    if (hero.atWall()){
	    hero.xVelocity = 0.0;
	    hero.yVelocity = 0.0;
    }*/

    if (hero.prevAnimation != hero.currAnimation){
    	hero.gotoAndPlay(hero.currAnimation);
    	hero.prevAnimation = hero.currAnimation;
    }

    hero.x += hero.xV * dt;
    hero.y += hero.yV * dt;
}