/* global Shapes */

var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context

var vPosition;    // shader variable attrib location for vertices
var vColor;       // shader variable attrib location for color
var vNormal;
var uColor;       // shader uniform variable location for color
var vTexCoords;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var program;

var checkerboard;
var imageTexture;
var randomgray;
var stripes;
var uTexture;
var uColorMode;

var shitangle=0;

var lighting = new Lighting();
var camera = new Camera();
var stack = new MatrixStack();

var room1 = new Room1();

window.onload = function init()
{

    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    setPointerLockEventHandler();

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.309, 0.505, 0.74, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    shaderSetup();

    Shapes.initShapes();  // create the primitive and other shapes


    checkerboard = new Checkerboard();
    imageTexture = new ImageTexture("textures/milton.png");
    randomgray = new RandomGray();
    stripes = new Stripes();

    lighting.setUp();

    render();
};

function shaderSetup() {
    uColorMode = gl.getUniformLocation(program, "uColorMode");
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoords = gl.getAttribLocation(program, "vTexCoords");
    uTexture = gl.getUniformLocation(program, "uTexture");
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

function render()
{
    camera.movement();

    if(shitangle<360){
        shitangle+=1;
    } else if (shitangle === 360){
        shitangle = 0;
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

    var viewMat = camera.calcViewMat();   // View matrix

    var newLight = mult(viewMat, lighting.light_position);
    gl.uniform4fv(uLight_position, newLight);


    gl.uniform4fv(uColor, vec4(0.41, 0.41, 0.41, 1.0));





    stack.clear();

    /*
    stack.push();
    stack.multiply(translate(.4,-.4,-1,1));
    stack.multiply(rotateY(-10));
    stack.multiply(scalem(0.1,0.1,0.1,1));
    Gun.draw(0);
    stack.pop();
    */

    stack.multiply(viewMat);

    imageTexture.activate();
    gl.uniform1i(uColorMode, 2);

    stack.push();
    stack.multiply(rotateY(shitangle));
    stack.multiply(translate(0,.505,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to green
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


 //gl.uniform1i(uColorMode, 2);

    room1.draw();


    lighting.draw();

    window.requestAnimFrame(render);

}
