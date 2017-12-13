function StartTeleportRoom() {
    this.br = new BaseRoom();
}

StartTeleportRoom.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, 5));
    this.br.draw();
    stack.pop();

    this.drawBackWall();
};


StartTeleportRoom.prototype.drawBackWall = function () {

    stack.push();
    stack.multiply(translate(0, 5, 10));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
