function TeleportRoom(z) {
    this.br = new BaseRoom();
    this.z = z;
}

TeleportRoom.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, this.z+5));
    this.br.draw();
    stack.pop();

    this.drawDoorWays();
};


TeleportRoom.prototype.drawDoorWays = function () {
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
