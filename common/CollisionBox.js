function CollisionBox(o ,r) {
    this.origin = o;
    this.r = r;
}

function collideSphere(camPos, dirVec, cbox) {
    var eye = vec3(camPos[0], camPos[1], camPos[2]);
    var dirV = vec3(dirVec[0], dirVec[1], dirVec[2]);

    var dirVN = normalize(dirV, false);

    var dir = scale(2, dirVN);

    var B = dot(dir, subtract(eye, cbox.origin));
    var C = dot(subtract(eye, cbox.origin), subtract(eye, cbox.origin)) - (cbox.r * cbox.r);

    var D = ((B * B) - (4 * C));

    if (D >= 0) {
        console.log("collision detected !!!!");
        return true;
    } else {
        console.log("sad, no collision");
        return false;
    }
}
