//(Made by Dolan for the quest of modularity)

//Halfway through, I  had decided that modular levels that
//only load one at a time (once the previous level was completed)
//would be better. So I made this:

//The StartTeleportRoom is where the player begins and will teleport back to
//once the level is completed. It too uses the base room and custom sized
//doorways.

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

    if(!started){
      this.drawDoor();
    }
};

StartTeleportRoom.prototype.drawDoor = function(){
    stack.push();
    stack.multiply(translate(0, 5, this.z-5));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

StartTeleportRoom.prototype.drawBackWall = function () {

    stack.push();
    stack.multiply(translate(0, 5, this.z+5));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
