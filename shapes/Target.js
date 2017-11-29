
function Target(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.hp = 100;
    this.frameCount = 0;
    this.heightFrameCount = 0;
}

Target.prototype.draw = function () {
    if (this.hp > 50) {
        this.drawIdle();
    } else if (this.hp < 50 && this.hp > 0) {
        this.drawDamaged();
    } else if(this.hp<=0){
        this.destroy();
        }
};

Target.prototype.drawIdle = function () {
    stack.push();
    stack.multiply(translate(this.x, this.y, this.z));
    stack.multiply(scalem(1, 1, .2));
    stack.multiply(rotateX(-90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Target.prototype.drawDamaged = function () {
    stack.push();
    stack.multiply(translate(this.x, this.y, this.z));
    stack.multiply(scalem(1, 1, .2));
    stack.multiply(rotateX(-90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Target.prototype.destroy = function () {
  /*
    stack.push();
    stack.multiply(translate(this.x, this.y, this.z));
    stack.multiply(scalem(1, 1, .2));
    stack.multiply(rotateX(-90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
*/
}
