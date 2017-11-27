function CollisionBox(o, l, w, h) {
    this.origin = o;
    this.l1 = o[0];
    this.l2 = o[0]+l;
    this.w1 = o[1];
    this.w2 = o[1]+w;
    this.h1 = o[2];
    this.h2 = o[2]+h;

}

function lCollide(cbox1,cbox2) {
    if(cbox1.l1<cbox2.l1&&cbox2.l1<cbox1.l2){
        return true;
    }
    if(cbox1.l1<cbox2.l2&&cbox2.l2<cbox1.l2){
        return true;
    }
}

function hCollide(cbox1,cbox2) {
    if(cbox1.h1<cbox2.h1&&cbox2.h1<cbox1.h2){
        return true;
    }
    if(cbox1.h1<cbox2.h2&&cbox2.h2<cbox1.h2){
        return true;
    }
}

function wCollide(cbox1,cbox2){
    if(cbox1.w1<cbox2.w1&&cbox2.w1<cbox1.w2){
        return true;
    }
    if(cbox1.w1<cbox2.w2&&cbox2.w2<cbox1.w2){
        return true;
    }
}

function collide(cbox1,cbox2) {
    if (isVertCollide(cbox1,cbox2) && isHoriCollide(cbox1,cbox2)&& hCollide(cbox1,cbox2)) {
        console.log("collision detected!");
    }
}
