
/* global stack, Shapes, uModel_view, gl, concrete, uColorMode */

//Following the base of Room1, I (Dolan) resized the BaseRoom and
//the doorways to make a much larger room with a few more targets.
//Other than that, it's functionally the same.

function Room2() {
    this.br = new BaseRoom();
    this.tr = new TeleportRoom(-50,2);
    this.str = new StartTeleportRoom(5);

    this.targets = [];
    var t1 = new Target(-17, 3, -2);
    var t2 = new Target(15, 2, -18);
    var t3 = new Target(-15, 4, -21);
    var t4 = new Target(4, 5, -45);
    var t5 = new Target(-10, 1, -36);
    this.targets.push(t1);
    this.targets.push(t2);
    this.targets.push(t3);
    this.targets.push(t4);
    this.targets.push(t5);
}

Room2.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, -25));
    stack.multiply(scalem(4, 1.0, 5));
    this.br.draw();
    stack.pop();

    this.tr.draw();
    this.str.draw();

    this.drawBarriers();
    this.drawDoorWays();

    target.activate();
    gl.uniform1i(uColorMode, 1);

    this.drawTargets();
};

Room2.prototype.drawBarriers = function () {
    stack.push();
    stack.multiply(translate(-12, 1.25, -17));
    stack.multiply(scalem(16, 2, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(15, 1.25, -26));
    stack.multiply(scalem(10, 6, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(-10, 1.25, -35));
    stack.multiply(scalem(4, 2.5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Room2.prototype.drawDoorWays = function () {
    stack.push();
    stack.multiply(translate(-10.75, 5, -50));
    stack.multiply(scalem(18.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0, 7.5, -50));
    stack.multiply(scalem(3, 5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(10.75, 5, -50));
    stack.multiply(scalem(18.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(-10.75, 5, 0));
    stack.multiply(scalem(18.5, 10, .5));
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
    stack.multiply(translate(10.75, 5, 0));
    stack.multiply(scalem(18.5, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


};

Room2.prototype.drawTargets = function () {
    if (this.targets.length > 0) {
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].draw();
        }
    }
};
