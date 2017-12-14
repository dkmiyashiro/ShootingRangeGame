function CollisionBox(o ,r) {
    this.origin = o;
    this.r = r;
}

//(Dolan)
//This "creates" a sphere of points around its origin with a radius of "r".
//The method below takes a starting point, a vector (a ray in this case),
//and then checks to see if any of the points of the vector match with the
//points of the sphere.

//Also, I hate collision.

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
        return false;
    }
}
