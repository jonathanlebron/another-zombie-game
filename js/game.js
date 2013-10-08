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
	canvasHeight = 768;

var player = {
	x: 430,
	y: 375,
	xSpeed: 2.5,
	ySpeed: 2.5,
	xVelocity: 0.0,
	yVelocity: 0.0,
	width: 26,
	height: 44,
	draw: function() {
		context.drawImage(images["hero"], 131, 5, this.width, this.height, this.x, this.y, this.width, this.height);
	}
};

// should create a closure to create clouds, instead of repeating code. will get to this
var cloud = {
	x: 0,
	y: 0,
	xVelocity: 0.5,
	width: canvasWidth,
	height: canvasHeight,
	draw: function() {
		context.drawImage(images["cloud"], this.x, this.y);
	}
};

var cloud2 = {
	x: canvasWidth,
	y: 0,
	xVelocity: -0.5,
	width: canvasWidth,
	height: canvasHeight,
	draw: function() {
		context.drawImage(images["cloud2"], this.x, this.y);
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
	cloud.draw();
	cloud2.draw();
}

function update(){
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

	player.x += player.xVelocity;
	player.y += player.yVelocity;

	// animate clouds
	if (cloud.x <= -canvasWidth)
		cloud.x = canvasWidth;

	if (cloud2.x <= -canvasWidth)
		cloud2.x = canvasWidth;

	cloud.x -= cloud.xVelocity;
	cloud2.x -= cloud2.xVelocity;
}