
/* global stack, Shapes, uModel_view, gl */

function Room1(){
}


Room1.prototype.draw = function(){
    this.drawFloor();
    this.drawWalls();

};

Room1.prototype.drawFloor = function(){
    stack.push();
    stack.multiply(scalem(25, .01, 20));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Room1.prototype.drawBarriers = function(){

};

Room1.prototype.drawWalls = function(){

    //left
    stack.push();
    stack.multiply(translate(-12.25,5,0));
    stack.multiply(scalem(.5, 10, 20));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //right
    stack.push();
    stack.multiply(translate(12.25,5,0));
    stack.multiply(scalem(.5, 10, 20));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //ceiling
    stack.push();
    stack.multiply(translate(0,10,0));
    stack.multiply(scalem(25, .5, 20));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //back
    stack.push();
    stack.multiply(translate(-7,5,9.75));
    stack.multiply(scalem(11, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(0,7.25,9.75));
    stack.multiply(scalem(3, 5, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    stack.push();
    stack.multiply(translate(7,5,9.75));
    stack.multiply(scalem(11, 10, .5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};
