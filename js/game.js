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

var resources = ["world", "world2", "worldWalls","cloud", "cloud2", "hero"];

var canvas,
	stage,
	context,
	totalResources = resources.length,
	numResourcesLoaded = 0,
	images = {},
	fps = 30,
	curFPS = 0,
	canvasWidth = 800,
	canvasHeight = 768,
	animationSpeed = 2,
	hero,
	cloud,
	cloud2;

var spriteSheetData = {
	images: [images["hero.png"]],
	frames: {width:28, height:42},
	animations: {
		downLeft:[0],
		up:[1],
		upLeft: [2],
		left: [3],
		down: [4],
		runLeft: [5, 10, "left", animationSpeed],
		runUpLeft: [11, 17, "upLeft", animationSpeed],
		runUp: [18, 23, "up", animationSpeed],
		runDownLeft: [24, 29, "downLeft", animationSpeed],
		runDOwn: [30, 35, "down", animationSpeed]
	}
};

function playAZG(){
    stage = new createjs.Stage("world");

    // load resources
    for (var i=0; i<resources.length; i++){
    	loadImage(resources[i]);
    }

    // world.jpg edited from http://www.spriters-resource.com/game_boy_advance/narutorpg/sheet/14388/
    var background = new createjs.Bitmap(images["world"]);
    background.x = 0;
    background.y = 0;
    stage.addChild(background);

    // add player

    // add clouds
    cloud = new createjs.Bitmap(images["cloud"]);
    cloud.x = 0;
    cloud.y = 0;
    cloud2 = new createjs.Bitmap(images["cloud2"]);
    cloud2.x = -800;
    cloud2.y = 0;
    stage.addChild(cloud);
    stage.addChild(cloud2);

    // main game loop
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(fps);
}

/*
var player = {
    x: 430,
    y: 375,
    xSpeed: 2.5,
    ySpeed: 2.5,
    xVelocity: 0.0,
    yVelocity: 0.0,
    width: 26,
    height: 44,
};*/

function loop(event){
    redraw();
    stage.update();
}

function loadImage(name) {
    images[name] = new Image();
    images[name].src = "images/" + name + ".png";
}

function redraw() {
    // animate clouds
    if (cloud.x > stage.canvas.width)
    	cloud.x = -800;

    if (cloud2.x > stage.canvas.width)
    	cloud2.x = -800;

    cloud.x += 0.5;
    cloud2.x += 0.5;

    /*
    player.xVelocity = 0.0;
    player.yVelocity = 0.0;

    if(keydown.left) {
        player.xVelocity -= player.xSpeed;
    }

    if(keydown.right) {
        player.xVelocity += player.xSpeed;
    }
    if(keydown.up) {
        player.yVelocity -= player.ySpeed;
    }
    if(keydown.down) {
        player.yVelocity += player.ySpeed;
    }

    if (player.atWall()){
	    player.xVelocity = 0.0;
	    player.yVelocity = 0.0;
    }

    player.x += player.xVelocity;
    player.y += player.yVelocity;

    // animate clouds
    if (cloud.x <= -canvasWidth)
        cloud.x = canvasWidth;

    if (cloud2.x <= -canvasWidth)
        cloud2.x = canvasWidth;

    cloud.x -= cloud.xVelocity;
    cloud2.x -= cloud2.xVelocity;

    canvas.width = canvas.width; // clears the canvas

    context.drawImage(images["world"], 0, 0);
    context.fillStyle = "#000";
    context.fillRect(player.x+5, player.y+5, player.width-10, player.height-10);
    player.draw();
    context.drawImage(images["world2"], 0, 0);
    context.font = "42px serif";
    context.fillText("Score: ", 10, 32);
    cloud.draw();
    cloud2.draw();
    */
}