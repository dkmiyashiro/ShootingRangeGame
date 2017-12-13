
/* global stack, Shapes, uModel_view, gl, concrete, uColorMode */

function Room2() {
    this.br = new BaseRoom();
    this.tr = new TeleportRoom(-50,2);
    this.str = new StartTeleportRoom(5);

    this.cleared = false;

    this.targets = [];
    var t1 = new Target(-2, 2, -14);
    var t2 = new Target(2, 2, -16);
    this.targets.push(t1);
    this.targets.push(t2);

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
