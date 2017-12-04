function CollisionBox(o, w, h, l) {
    this.origin = o;
    this.l1 = o[2];
    this.l2 = o[2] + l;
    this.w1 = o[0];
    this.w2 = o[0] + w;
    this.h1 = o[1];
    this.h2 = o[1] + h;

}

function lCollide(cbox1, cbox2) {
    if (cbox1.l1 < cbox2.l1 && cbox2.l1 < cbox1.l2) {
        return true;
    }
    if (cbox1.l1 < cbox2.l2 && cbox2.l2 < cbox1.l2) {
        return true;
    }
}

function hCollide(cbox1, cbox2) {
    if (cbox1.h1 < cbox2.h1 && cbox2.h1 < cbox1.h2) {
        return true;
    }
    if (cbox1.h1 < cbox2.h2 && cbox2.h2 < cbox1.h2) {
        return true;
    }
}

function wCollide(cbox1, cbox2) {
    if (cbox1.w1 < cbox2.w1 && cbox2.w1 < cbox1.w2) {
        return true;
    } else if (cbox1.w1 < cbox2.w2 && cbox2.w2 < cbox1.w2) {
        return true;
    }
}


function lCollideVec(vec1, vec2, cbox2) {
    if (vec1[2] <= (cbox2.l1+Math.abs(cbox2.l1-cbox2.l2)) && (vec1[2]+Math.abs(vec1[2]-vec2[2]))>=cbox2.l1) {
        return true;
    }else{
        return false;
    }
}

function hCollideVec(vec1, vec2, cbox2) {
    if (vec1[1] <= (cbox2.h1+Math.abs(cbox2.h1-cbox2.h2)) && (vec1[1]+Math.abs(vec1[1]-vec2[1]))>=cbox2.h1) {
        return true;
    }else{
        return false;
    }
}

function wCollideVec(vec1, vec2, cbox2) {
    if (vec1[0] <= (cbox2.w1+Math.abs(cbox2.w1-cbox2.w2)) && (vec1[0]+Math.abs(vec1[0]-vec2[0]))>=cbox2.w1) {
        return true;
    } else {
        return false;
    }
}

function collide(cbox1, cbox2) {
    if (lCollide(cbox1, cbox2) && hCollide(cbox1, cbox2) && wCollide(cbox1, cbox2)) {
        console.log("collision detected!");
    }
}

function collideVec(vec1, vec2, cbox2) {
    if (lCollideVec(vec1, vec2, cbox2) && hCollideVec(vec1, vec2, cbox2) && wCollideVec(vec1, vec2, cbox2)) {
        console.log("vector collision detected!");
    } else {
        console.log(lCollideVec(vec1, vec2, cbox2));
        console.log(hCollideVec(vec1, vec2, cbox2));
        console.log(wCollideVec(vec1, vec2, cbox2));
        console.log(vec1);
        console.log(vec2);
        console.log(cbox2);
    }
}
