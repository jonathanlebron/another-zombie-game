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
	cloudYSpeed = 0,
	playerX = 430,
	playerY = 375,
	playerXSpeed = 5,
	playerYSpeed = 5,
	playerXVel,
	playerYVel;

function setupAZG(){
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.getElementById("world");

	context = canvas.getContext("2d"); // Grab the 2d canvas context

	loadImage("world"); //edited from http://www.spriters-resource.com/game_boy_advance/narutorpg/sheet/14388/
	loadImage("cloud");
	loadImage("cloud2");
	loadImage("hero");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function(){
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {
  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources)
	setInterval(redraw, 1000 / fps);
}

function redraw() {
  canvas.width = canvas.width; // clears the canvas

  animateClouds();
  context.drawImage(images["world"], 0, 0);
  context.drawImage(images["hero"], 131, 5, 26, 44, playerX, playerY, 26, 44);
  context.font = "42px serif";
  context.fillText("Score: ", 10, 32);
  context.drawImage(images["cloud"], cloudX, cloudY);
  context.drawImage(images["cloud2"], cloud2X, cloud2Y);
}

function animateClouds(){
  if (cloudX <= -canvasWidth)
  	cloudX = canvasWidth;

  if (cloud2X <= -canvasWidth)
  	cloud2X = canvasWidth;

  cloudX -= cloudXSpeed;
  cloud2X -= cloudXSpeed;
}

window.addEventListener('keydown', handleInput,false);
function handleInput(e){
	var key = e.keyCode;
	playerXVel = 0.0;
	playerYVel = 0.0;

	switch (key) {
        case 37: playerXVel -= playerXSpeed; break; //Left key
        case 38: playerYVel -= playerYSpeed; break; //Up key
        case 39: playerXVel += playerXSpeed; break; //Right key
        case 40: playerYVel += playerYSpeed; break; //Down key
        default: break; //Everything else
    }

    move();
}

function move(){
	playerX += playerXVel;
	playerY += playerYVel;
}
