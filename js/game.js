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

var canvas,
	context,
	totalResources = 1,
	numResourcesLoaded = 0,
	images = {},
	fps = 30,
	curFPS = 0,
	canvasWidth = 800,
	canvasHeight = 768;

function setupAZG(){
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.getElementById("world");

	context = canvas.getContext("2d"); // Grab the 2d canvas context

	loadImage("world"); //edited from http://www.spriters-resource.com/game_boy_advance/narutorpg/sheet/14388/
	loadImage("cloud");
	loadImage("cloud2");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() {
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
	setInterval(redraw, 1000 / fps);
  }
}

function redraw() {
  canvas.width = canvas.width; // clears the canvas

  context.drawImage(images["world"], 0, 0);
  context.drawImage(images["cloud"], 0, 0);
  context.drawImage(images["cloud2"], canvasWidth, 0);
}