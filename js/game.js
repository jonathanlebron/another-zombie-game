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

var resources = ["world", "cloud", "cloud2", "hero"];

var canvas,
	context,
	totalResources = resources.length,
	numResourcesLoaded = 0,
	images = {},
	fps = 30,
	curFPS = 0,
	canvasWidth = 800,
	canvasHeight = 768,
	cloudX = 0,
	cloudY = 0,
	cloud2X = 800,
	cloud2Y = 0,
	cloudXSpeed = .5,
	cloudYSpeed = 0;

var player = {
	x: 430,
	y: 375,
	xSpeed: 5,
	ySpeed: 5,
	xVelocity: 0.0,
	yVelocity: 0.0,
	width: 26,
	height: 44,
	draw: function() {
		context.drawImage(images["hero"], 131, 5, this.width, this.height, this.x, this.y, this.width, this.height);
	}
};

function playAZG(){
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.getElementById("world");

	context = canvas.getContext("2d"); // Grab the 2d canvas context

	// world.jpg edited from http://www.spriters-resource.com/game_boy_advance/narutorpg/sheet/14388/
	for (var i=0; i<resources.length; i++){
		loadImage(resources[i]);
	}

	// main game loop
	setInterval(function(){
		update();
		redraw();
	}, 1000 / fps);
}

function loadImage(name) {
	images[name] = new Image();
	images[name].src = "images/" + name + ".png";
}

function redraw() {
	canvas.width = canvas.width; // clears the canvas

	context.drawImage(images["world"], 0, 0);
	player.draw();
	context.font = "42px serif";
	context.fillText("Score: ", 10, 32);
	context.drawImage(images["cloud"], cloudX, cloudY);
	context.drawImage(images["cloud2"], cloud2X, cloud2Y);
}

function update(){
	if(keydown.left) {
		player.x -= 5;
	}
	if(keydown.right) {
		player.x += 5;
	}
	if(keydown.up) {
		player.y -= 5;
	}
	if(keydown.down) {
		player.y += 5;
	}

	// animate clouds
	if (cloudX <= -canvasWidth)
		cloudX = canvasWidth;

	if (cloud2X <= -canvasWidth)
		cloud2X = canvasWidth;

	cloudX -= cloudXSpeed;
	cloud2X -= cloudXSpeed;
}

function handleInput(e){
	var key = e.keyCode;
	player.xVelocity = 0.0;
	player.yVelocity = 0.0;

	switch (key) {
        case 37: player.xVelocity -= player.xSpeed; break; //Left key
        case 38: player.yVelocity -= player.ySpeed; break; //Up key
        case 39: player.xVelocity += player.xSpeed; break; //Right key
        case 40: player.yVelocity += player.ySpeed; break; //Down key
        default: break; //Everything else
    }

    move();
}

function move(){
	player.x += player.xVelocity;
	player.y += player.yVelocity;
}
