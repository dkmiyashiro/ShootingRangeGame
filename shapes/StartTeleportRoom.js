function StartTeleportRoom(z) {
    this.br = new BaseRoom();
    this.z = z;
}

StartTeleportRoom.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, this.z));
    this.br.draw();
    stack.pop();

    this.drawBackWall();
};


StartTeleportRoom.prototype.drawBackWall = function () {

    stack.push();
    stack.multiply(translate(0, 5, this.z+5));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
