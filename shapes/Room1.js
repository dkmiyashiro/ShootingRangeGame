
/* global stack, Shapes, uModel_view, gl, concrete, uColorMode */

function Room1() {
    this.br = new BaseRoom();
    this.light = new Lighting();
    this.t1 = new Target(0,2,-12);
}

Room1.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0,0,-12.5));
    stack.multiply(scalem(2,1.0,2.5));
    this.br.draw();
    stack.pop();

    this.drawBarriers();
    this.drawDoorWays();

    target.activate();
    gl.uniform1i(uColorMode, 1);

    this.drawTargets();
};

Room1.prototype.drawBarriers = function () {
    stack.push();
    stack.multiply(translate(-6.5,1.25,-17));
    stack.multiply(scalem(7,2.5,.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(6.5,1.25,-13));
    stack.multiply(scalem(7,2.5,.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Room1.prototype.drawDoorWays = function () {

};

Room1.prototype.drawTargets = function () {
    this.t1.draw();
};
