/*
 All made by Dolan Miyashiro
 */

/* global uModel_view, stack, gl, uColor, Shapes, recoilNum */

var Trigger = {};
var Guard = {};
var Slide = {};
var Grip = {};

var GunStat = {}; //this is made up by everything above.
var Gun = {};

var Magazine = {}; //These are all firing related and are separate from the gun.
var Bullet = {};
var Casing = {};
var Cartridge = {};

var fired = false;
var recoilAngle = 0;
var fireFrames = 0;

var muzzleFlash = new Lighting(vec4(0, -1, -2, 1), vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), 0.8);
//Here are the main draw functions

Gun.draw = function () {
    if (fired && fireFrames < 4) {
        fireFrames++;

        stack.push();
        stack.multiply(translate(0, 0, 1, 1));
        stack.multiply(rotateX(-5));
        stack.multiply(translate(0, 0, -1, 1));
        GunStat.draw(fireFrames * .5);
        stack.pop();
    } else if (fireFrames === 4) {
        fireFrames--;
        stack.push();
        stack.multiply(translate(0, 0, 1, 1));
        stack.multiply(rotateX(5));
        stack.multiply(translate(0, 0, -1, 1));
        GunStat.draw(fireFrames * .5);
        stack.pop();
        fired = false;
    } else if (!fired && fireFrames < 4 && fireFrames > 0) {
        fireFrames--;
        stack.push();
        stack.multiply(translate(0, 0, 1, 1));
        stack.multiply(rotateX(5));
        stack.multiply(translate(0, 0, -1, 1));
        GunStat.draw(fireFrames * .5);
        stack.pop();
    } else if (!fired && fireFrames === 0) {
        stack.push();
        GunStat.draw(0);
        stack.pop();
    }
};

GunStat.draw = function (z) {
    Trigger.draw();
    Guard.draw();
    Grip.draw();
    Slide.draw(z);
};

Trigger.draw = function () {
    stack.push();
    stack.multiply(translate(0, .7, .5));
    stack.multiply(scalem(.5, .5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Guard.draw = function () {
    stack.push();
    stack.multiply(translate(0, .5, 0));
    stack.multiply(scalem(.5, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 0, .5));
    stack.multiply(scalem(.5, .05, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Slide.draw = function (z) {
    slideR(z);
    slideL(z);
    slideB(z);
    slideF(z);
    slideT(z);
    barrel();
    slideCover();
};

Grip.draw = function () {
    gripBot();
    gripTop();
};

Cartridge.draw = function (cz) { //a bullet in its casing
    stack.push();
    stack.multiply(translate(0, 0, 0));
    stack.multiply(scalem(.25, .25, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 0, 0));
    stack.multiply(rotateX(180));
    stack.multiply(scalem(.25, .25, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
};

Casing.draw = function (cx, ra) {
    stack.push();
    stack.multiply(translate(cx, 2 - (cx / 5), 1));
    stack.multiply(rotateX(ra));
    stack.multiply(scalem(.25, .25, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Bullet.draw = function (bz, ra) {
    stack.push();
    stack.multiply(rotateX(ra));
    stack.multiply(translate(0, 2, bz));
    stack.multiply(rotateX(180));
    stack.multiply(scalem(.25, .25, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
};

//Below this are all of the separate pieces referened above to make up the
//draw functions.

function magBot() {

}


function gripBot() {
    stack.push();
    stack.multiply(translate(0, 0, 1.5));
    stack.multiply(scalem(1.1, 2, 1.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function gripTop() {
    stack.push();
    stack.multiply(translate(0, 1.25, .1));
    stack.multiply(scalem(1.1, .5, 4.6));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideR(z) {
    stack.push();
    stack.multiply(translate(.5, 2, 1.375 + z));
    stack.multiply(scalem(0.05, 1, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(.5, 1.75, 0 + z));
    stack.multiply(scalem(0.05, .5, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(.5, 2, -1.375 + z));
    stack.multiply(scalem(0.05, 1, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideL(z) {
    stack.push();
    stack.multiply(translate(-.5, 2, 0 + z));
    stack.multiply(scalem(0.05, 1, 4.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}
function slideB(z) {
    stack.push();
    stack.multiply(translate(0, 2, -2.25 + z));
    stack.multiply(scalem(1, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideF(z) {
    stack.push();
    stack.multiply(translate(0, 2, 2.25 + z));
    stack.multiply(scalem(1, 1, .05));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideT(z) {
    stack.push();
    stack.multiply(translate(0, 2.5, 1.375 + z));
    stack.multiply(scalem(1, .05, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(-.25, 2.5, 0 + z));
    stack.multiply(scalem(0.5, .05, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 2.5, -1.375 + z));
    stack.multiply(scalem(1, .05, 1.75));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function slideCover() {
    stack.push();
    stack.multiply(translate(0, 2, 0));
    stack.multiply(scalem(1, 1, 1.25));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

function barrel() {
    stack.push();
    stack.multiply(translate(0, 2, -2.7));
    stack.multiply(scalem(.25, .25, 4.5));
    stack.multiply(rotateX(-90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
}
