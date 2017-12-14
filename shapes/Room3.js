//(Dolan)

/* global stack, Shapes, uModel_view, gl, concrete, uColorMode */

//Room3 used the same measurements as room1, but instead implemented two
//different arrays. In the camera's fire() method, it checks to see if there is a
//hidden targets array, and pulls from it. This lets the room draw each target
//one at a time.

function Room3() {
    this.br = new BaseRoom();
    this.tr = new TeleportRoom(-25,3);
    this.str = new StartTeleportRoom(5);

    this.targets = [];
    this.hiddenTargets =[];
    var t1 = new Target(-2, 2, -14);
    var t2 = new Target(2, 3, -20);
    var t3 = new Target(-4, 2, -11);
    var t4 = new Target(3, 4, -14);
    var t5 = new Target(-3, 2, -17);
    var t6 = new Target(0, 3, -6);
    var t7 = new Target(-2, 2, -14);
    var t8 = new Target(2, 2, -16);
    this.targets.push(t1);
    this.hiddenTargets.push(t2);
    this.hiddenTargets.push(t3);
    this.hiddenTargets.push(t4);
    this.hiddenTargets.push(t5);
    this.hiddenTargets.push(t6);
    this.hiddenTargets.push(t7);
    this.hiddenTargets.push(t8);
}

Room3.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, -12.5));
    stack.multiply(scalem(2, 1.0, 2.5));
    this.br.draw();
    stack.pop();

    this.tr.draw();
    this.str.draw();

    if(!this.tr.cleared){
      this.drawBarriers();
    }

    this.drawDoorWays();

    target.activate();
    gl.uniform1i(uColorMode, 1);

    this.drawTargets();
};

Room3.prototype.drawBarriers = function () {
    stack.push();
    stack.multiply(translate(0, 1, -5));
    stack.multiply(scalem(25, 2, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};

Room3.prototype.drawDoorWays = function () {
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

Room3.prototype.drawTargets = function () {
    if (this.targets.length > 0) {
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].draw();
        }
    }
};
