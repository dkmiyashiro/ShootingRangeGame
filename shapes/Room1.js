/* global stack, Shapes, uModel_view, gl */

function Room1() {
    this.br = new BaseRoom();
}


Room1.prototype.draw = function () {
    stack.push();
    stack.multiply(scalem(2,1.5,2.5));
    this.br.draw();
    stack.pop();
};

Room1.prototype.drawBarriers = function () {

};
