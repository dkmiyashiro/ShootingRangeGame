/* global Shapes */

var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context

var started = false;

var vPosition;    // shader variable attrib location for vertices
var vColor;       // shader variable attrib location for color
var vNormal;
var uColor;       // shader uniform variable location for color
var vTexCoords;
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var program;

var checkerboard;
var milton;
var target;
var concrete;
var randomgray;
var stripes;

var uTexture;
var uColorMode;

var lighting = new Lighting();
var camera = new Camera();
var stack = new MatrixStack();

var room1 = new Room1();
var room2 = new Room2();
var room3 = new Room3();
var currentRoom = room1;

var startCube = new CollisionBox(vec3(0,.505,2),.5);
var shitangle=0;

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
    milton = new ImageTexture("textures/milton.png");
    concrete = new ImageTexture("textures/concrete.jpg");
    target = new ImageTexture("textures/target.png");
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

function render(){

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

    stack.push();
    gl.uniform1i(uColorMode, 2);
    stack.multiply(translate(.4,-.4,-1,1));
    stack.multiply(rotateY(-10));
    stack.multiply(scalem(0.1,0.1,0.1,1));
    Gun.draw(0);
    stack.pop();

    stack.multiply(viewMat); //draw everything after this!!!!

    if(!started){ //this just handles the color of the starting cube
      gl.uniform1i(uColorMode, 2);
      if(currentRoom===room1){
      gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    }else if(currentRoom===room2){
      gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    }else if(currentRoom===room3){
      gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
      }

      stack.push();
      stack.multiply(translate(0,.505,2));
      stack.multiply(rotateY(shitangle));
      gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
      Shapes.drawPrimitive(Shapes.cube);
      stack.pop();
    }else{
        clearCheck();
    }

    currentRoom.draw();
    lighting.draw();
    window.requestAnimFrame(render);

}

clearCheck = function(){
    if(currentRoom.tr.cleared){
      switch(currentRoom){
        case room1:
        if(-1<camera.eye[0]&&camera.eye[0]<1&&-32<camera.eye[2]&&camera.eye[2]<-28){
            camera.reset();
            started = false;
            currentRoom = room2;
        }
        break;

        case room2:
        if(-1<camera.eye[0]&&camera.eye[0]<1&&-56<camera.eye[2]&&camera.eye[2]<-52){
            camera.reset();
            started = false;
            currentRoom = room3;
          }
        break;
      }
    }
}
