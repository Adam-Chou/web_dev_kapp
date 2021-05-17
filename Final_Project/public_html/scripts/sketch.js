//This is my p5 code, minified
function Particle(){this.pos=createVector(random(width),random(height));this.vel=createVector(0,0);this.acc=createVector(0,0);this.maxspeed=5;this.prePos=this.pos.copy();this.c=100;this.size=0.25;this.update=function(){this.vel.add(this.acc);this.vel.limit(this.maxspeed);this.pos.add(this.vel);this.acc.mult(0)}
this.applyForce=function(force){this.acc.add(force)}
this.follow=function(vectors){var x=floor(this.pos.x/scl);var y=floor(this.pos.y/scl);var index=x+y*cols;var force=vectors[index];this.applyForce(force)}
this.show=function(){stroke(random(55,215),this.c,random(200,255),25);if(this.c>205){change=!1}else if(this.c<100){change=!0}
if(change==!1){this.c=this.c-1}else{this.c=this.c+1}
this.size=this.s*noise(this.s);strokeWeight(this.size);line(this.pos.x,this.pos.y,this.prePos.x,this.prePos.y);this.updatePrev()}
this.updatePrev=function(){this.prePos.x=this.pos.x;this.prePos.y=this.pos.y}
this.edges=function(){if(this.pos.x>width-10){this.pos.x=10;this.updatePrev()}
if(this.pos.x<10){this.pos.x=width-10;this.updatePrev()}
if(this.pos.y>height-10){this.pos.y=10;this.updatePrev()}
if(this.pos.y<10){this.pos.y=height-10;this.updatePrev()}}}
var inc=0.1;var scl=10;var cols,rows;var zoff=0;var particles=[];var flowfield;var change=!1;var canvas;function windowResized(){resizeCanvas(windowWidth,windowHeight)}
function setup(){canvas=createCanvas(windowWidth,windowHeight);canvas.position(0,0);canvas.style('z-index','1');cols=floor(width/scl);rows=floor(height/scl);for(var i=0;i<height*5;i++){particles[i]=new Particle()}
flowfield=new Array(cols*rows)}
function draw(){background(0);var yoff=0;for(var y=0;y<rows;y++){var xoff=0;for(var x=0;x<cols;x++){var index=(x+y*cols);var angle=noise(xoff,yoff,zoff)*HALF_PI*3.5;var v=p5.Vector.fromAngle(angle);v.setMag(1);flowfield[index]=v;xoff+=inc}
yoff+=inc;zoff+=0.001}
for(var i=0;i<particles.length;i++){particles[i].follow(flowfield);particles[i].update();particles[i].show();particles[i].edges()}}