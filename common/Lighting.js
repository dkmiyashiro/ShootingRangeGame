/*
 * Contains the lighting and material  parameters and sets up
 * uniform variables for these parameters.
 * Note: If you want to use different material properties for different objects, you
 * need to split these parameters into separate lighting and material parameterss (e.g. have a
 * Lighting.js and a Material,js)  They are kept together here for simplicity.
 */

/* global camera, stack */

var uAmbient_product;
var uDiffuse_product;
var uSpecular_product;
var uLight_position;
var uShininess;
var lightTheta=0;

function Lighting() {
    // Important:  These light coordinates are in World Coordinates.
    //             Before sending them to the vertex shader, we need
    //             to convert to eye coordinates. This is done in the render method.
    this.light_position = vec4(4, 8, 4, 1);

    // Light colors all set to white at the moment
    this.ambientColor = vec4(1.0, 1.0, 1.0, 1.0);
    this.diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
    this.specularColor = vec4(2.0, 2.0, 2.0, 1.0);

    this.intensity = 0.8;

    // These are really material properties and belong with each individual object but
    // for now we will lump them in here and they will apply to all objects.
    this.ka = 0.2;
    this.kd = 1.0;
    this.ks = 0.7;
    this.shininess = 50.0;
}

Lighting.prototype.draw = function () {
    stack.push();
    stack.multiply(translate(this.light_position[0], this.light_position[1], this.light_position[2]));
    stack.multiply(scalem(.2, .2, .2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    };


Lighting.prototype.setUp = function () {
    var ambient_product = scale(this.ka * this.intensity, this.ambientColor);
    var diffuse_product = scale(this.kd * this.intensity, this.diffuseColor);
    var specular_product = scale(this.ks * this.intensity, this.specularColor);

    uAmbient_product = gl.getUniformLocation(program, "uAmbient_product")
    gl.uniform4fv(uAmbient_product, ambient_product);

    uDiffuse_product = gl.getUniformLocation(program, "uDiffuse_product")
    gl.uniform4fv(uDiffuse_product, diffuse_product);

    uSpecular_product = gl.getUniformLocation(program, "uSpecular_product")
    gl.uniform4fv(uSpecular_product, specular_product);

    uLight_position = gl.getUniformLocation(program, "uLight_position")
    gl.uniform4fv(uLight_position, this.light_position);

    uShininess = gl.getUniformLocation(program, "uShininess");
    gl.uniform1f(uShininess, this.shininess);
};
