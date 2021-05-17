"use strict";

function Particle() {
  //   initial position
  this.pos = createVector(random(width), random(height)); // accumulator

  this.vel = createVector(0, 0); //accumulator

  this.acc = createVector(0, 0); // set how fast it goes

  this.maxspeed = 10; // set previous position to position

  this.prePos = this.pos.copy(); //use for color 

  this.c = 100; //use for size

  this.size = 0.25;

  this.update = function () {
    // add acceleration to velocity
    this.vel.add(this.acc); // limit() sets the bar. In this case, the velocity limit has been set to var maxspeed

    this.vel.limit(this.maxspeed); // adds velocity to the position of the initial

    this.pos.add(this.vel); // reset acceleration property after use.

    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };

  this.show = function () {
    // color changer
    stroke(random(55, 215), this.c, random(200, 255), 25);

    if (this.c > 205) {
      change = false;
    } else if (this.c < 100) {
      change = true;
    }

    if (change == false) {
      this.c = this.c - 1;
    } else {
      this.c = this.c + 1;
    }

    this.size = this.s * noise(this.s);
    strokeWeight(this.size);
    line(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y);
    this.updatePrev();
  };

  this.updatePrev = function () {
    this.prePos.x = this.pos.x;
    this.prePos.y = this.pos.y;
  };

  this.edges = function () {
    if (this.pos.x > width - 10) {
      this.pos.x = 10;
      this.updatePrev();
    }

    if (this.pos.x < 10) {
      this.pos.x = width - 10;
      this.updatePrev();
    }

    if (this.pos.y > height - 10) {
      this.pos.y = 10;
      this.updatePrev();
    }

    if (this.pos.y < 10) {
      this.pos.y = height - 10;
      this.updatePrev();
    }
  };
}

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
var change = false;
var canvas;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '5');
  cols = floor(width / scl);
  rows = floor(height / scl);

  for (var i = 0; i < height * 20; i++) {
    particles[i] = new Particle();
  }

  flowfield = new Array(cols * rows);
}

function draw() {
  background(0);
  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    var xoff = 0;

    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * HALF_PI * 3.5;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }

    yoff += inc;
    zoff += 0.001;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
}