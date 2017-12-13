function Target(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.hp = 100;
    this.frameCount = 0;
    this.heightFrameCount = 0;
    this.o = vec3(x, y, z);
    this.hitbox = new CollisionBox(this.o, 1);
    this.destroyed = false;
}

Target.prototype.draw = function () {
    if (this.hp > 50) {
        this.drawIdle();
    } else if (this.hp <= 50 && this.hp > 0) {
        this.drawDamaged();
    } else if (this.hp <= 0) {
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
    this.destroyed = true;
};

Target.prototype.hit = function () {
    var dist = Math.pow(Math.pow(camera.eye[2]-this.z,2) + Math.pow(camera.eye[0]-this.x,2),.5);
    this.hp -= (30+(Math.max(75-dist,0)));

    if (this.hp <= 0) {
        this.destroyed = true;
    }
};

Target.prototype.superhit = function () {
    this.hp -= 1000;
    if (this.hp <= 0) {
        this.destroyed = true;
    }
};
