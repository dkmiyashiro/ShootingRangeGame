
/* global stack, Shapes, uModel_view, gl, concrete, uColorMode */

//The first room created (as denoted by "Room1"). I (Dolan), tested out a few
//methods for handling targets, and came up with handling them with an array.

//This room only has two targets.

function Room1() {
    this.br = new BaseRoom();
    this.tr = new TeleportRoom(-25,1);
    this.str = new StartTeleportRoom(5);

    this.targets = [];
    var t1 = new Target(-2, 2, -14);
    var t2 = new Target(2, 2, -16);
    this.targets.push(t1);
    this.targets.push(t2);

}

Room1.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, -12.5));
    stack.multiply(scalem(2, 1.0, 2.5));
    this.br.draw();
    stack.pop();

    this.tr.draw(); //draws the teleport room
    this.str.draw(); //draws the starting room

    this.drawBarriers();
    this.drawDoorWays();

    target.activate();
    gl.uniform1i(uColorMode, 1);

    this.drawTargets();
};

Room1.prototype.drawBarriers = function () {
    stack.push();
    stack.multiply(translate(-6.5, 1.25, -17));
    stack.multiply(scalem(7, 2.5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(6.5, 1.25, -13));
    stack.multiply(scalem(7, 2.5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Room1.prototype.drawDoorWays = function () {
    //This long draw method are the two doorways I was talking about. At first
    //I thought I could use arithmetic, but it became clear that I needed to
    //make slight adjustments through trial and error.

    stack.push();
    stack.multiply(translate(-5.75, 5, -25));
    stack.multiply(scalem(8.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 7.5, -25));
    stack.multiply(scalem(3, 5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(5.75, 5, -25));
    stack.multiply(scalem(8.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(-5.75, 5, 0));
    stack.multiply(scalem(8.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 7.5, 0));
    stack.multiply(scalem(3, 5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(5.75, 5, 0));
    stack.multiply(scalem(8.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


};

Room1.prototype.drawTargets = function () {
    if (this.targets.length > 0) {
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].draw();
        }
    }
};
