function TeleportRoom(z) {
    this.br = new BaseRoom();
    this.z = z;
}

TeleportRoom.prototype.draw = function () {

    stack.push();
    stack.multiply(translate(0, 0, this.z-5));
    this.br.draw();
    stack.pop();

    this.drawBackWall();
};


TeleportRoom.prototype.drawBackWall = function () {

    stack.push();
    stack.multiply(translate(0, 5, this.z-10));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
