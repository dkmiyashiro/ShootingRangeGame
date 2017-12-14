//(Also made by Dolan in the quest for modularity)

//The TeleportRoom is the "ending room" that opens up only
//after one finishes the level. There is a pad which one can
//step on to end the level. (The level only ends if all targets
//have been cleared).


function TeleportRoom(z,col) {
    this.br = new BaseRoom();
    this.z = z;

    this.padColor = col;

    this.cleared = false;
}

TeleportRoom.prototype.draw = function () {
    stack.push();
    stack.multiply(translate(0, 0, this.z-5));
    this.br.draw();
    stack.pop();

    this.drawBackWall();

    if(!this.cleared){
        this.drawDoor();
    }

    this.drawTP();
};

TeleportRoom.prototype.drawTP = function () { //similar to the start cube
  gl.uniform1i(uColorMode, 2);

 if(this.padColor===1){
  gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
  }else if(this.padColor===2){
  gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
}else if(this.padColor===3){
  checkerboard.activate();
  gl.uniform1i(uColorMode, 1);
  }

  stack.push();
  stack.multiply(translate(0,0,this.z-5));
  stack.multiply(scalem(2, .25, 2));
  gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
  Shapes.drawPrimitive(Shapes.cylinder);
  stack.pop();
};

TeleportRoom.prototype.drawDoor = function(){
    stack.push();
    stack.multiply(translate(0, 2.5, this.z));
    stack.multiply(scalem(3, 5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

TeleportRoom.prototype.drawBackWall = function () {
    stack.push();
    stack.multiply(translate(0, 5, this.z-10));
    stack.multiply(scalem(10, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};
