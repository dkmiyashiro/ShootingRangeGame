/* global lighting */

/**
 *  Event handler methods. Stores the state of the mouse.
 * @type {type}
 */

var mouseState = {
    startx: 0,  // position at the start of a mouse move
    starty: 0,
    down: false,
    x: 0,    // current position of mouse during a mouse move

    delx: 0, // difference between x and startx
    dely: 0,
    
    // The mouse button being pressed
    actionChoice: {TUMBLE: 0, // left mouse button
        DOLLY: 1, // middle mouse button
        TRACK: 2, // right mouse button
        NONE: 3
    },
    
/**
 * Reset parameters when mouse is released
 * @return {undefined}
 */
    reset: function () {
        this.startx = 0;
        this.starty = 0;
        this.down = false;
        this.x = 0;
        this.y = 0;
        this.delx = 0;
        this.dely = 0;
        this.action = this.actionChoice.NONE;
    },

/** 
 * Helper funtion to display mouse state
 * @return {String|message}
 */
    displayMouseState: function () {
        message = "<b>Mouse state: </b><br>&nbsp;startx=" + mouseState.startx +
                "<br>&nbsp;starty=" + mouseState.starty +
                "<br>&nbsp;x = " + mouseState.x + 
                "<br>&nbsp;y = " + mouseState.y +
                "<br>&nbsp;delx = " + mouseState.delx + 
                "<br>&nbsp;dely = " + mouseState.dely +
                "<br>&nbsp;button = " + mouseState.action +
                "<br>&nbsp;down = " + mouseState.down;
        return message;
    }
};
mouseState.action =  mouseState.actionChoice.NONE; // current mouse button

/**
 * Mouse event handlers
 * @return {undefined}
 */
function setMouseEventHandler() {
    canvas = document.getElementById( "gl-canvas" );
    canvas.addEventListener("mousedown", function (e) {
        mouseState.startx = e.clientX;
        mouseState.starty = e.clientY;
        mouseState.x = e.clientX;
        mouseState.y = e.clientY;
        mouseState.delx = 0;
        mouseState.dely = 0;
        mouseState.down = true;
        mouseState.action = e.button;
        
    });
    canvas.addEventListener("mouseup", function (e) {
       // console.log("mouse up");
        mouseState.reset();
       
        
    });
    canvas.addEventListener("mousewheel", function (e) {
        mouseState.action = mouseState.actionChoice.DOLLY;
        mouseState.x = e.clientX;
        mouseState.y = e.clientY;
        mouseState.delx = e.wheelDelta;
        mouseState.dely = e.wheelDelta;
        camera.motion();
        
    });
    canvas.addEventListener("mousemove", function (e) {
        if (mouseState.down) {
            mouseState.x = e.clientX;
            mouseState.y = e.clientY;
            mouseState.delx = mouseState.x - mouseState.startx;
            mouseState.dely = mouseState.y - mouseState.starty;
            camera.motion();
        }
    });
            
    document.getElementById("slider").oninput = function () {  
        lightTheta = document.getElementById("slider").value;
        lighting.light_position = vec4(4, 8, 4, 1);
        lighting.light_position= mult(rotateY(lightTheta),lighting.light_position);
    };
    
}


/**
 * Key press event handlers. Actions are defined in the Camera class
 * @return {undefined}
 */

function setKeyEventHandler() {
    window.onkeydown = function (e) {
        var c = String.fromCharCode(e.keyCode);
        camera.keyAction(c);
        document.getElementById("keypress").innerHTML = "<b>Key pressed:</b> " + c + "<br>";
    };
    

}

