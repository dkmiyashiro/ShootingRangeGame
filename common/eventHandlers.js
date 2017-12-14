/* global lighting, camera, currentRoom */

/**
 *  Event handler methods. Stores the state of the mouse.
 * @type {type}
 */
var mouseLockBool = false;
var forW = false, lefA = false, rigD = false, bacS = false, shifRun = false;

var placeholdX = 0;
var placeholdY = 0;

var havePointerLock = 'pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document;

var mouseState = {
    startx: 0, // position at the start of a mouse move
    starty: 0,
    down: false,
    x: 0, // current position of mouse during a mouse move

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
mouseState.action = mouseState.actionChoice.NONE; // current mouse button

/**
 * Mouse event handlers
 * @return {undefined}
 */
function setMouseEventHandler() {
    canvas = document.getElementById("gl-canvas");
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

}

/**
 * (Dolan (now deceased))
 * The bane of my existence: PointerLock eventHandlers. All info
 * regarding it can be found online in its API.
 * @return {me, but dead}
 */

function setPointerLockEventHandler() {
    changeCallback = function () {
        if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas ||
                document.webkitPointerLockElement === canvas) {
            canvas.addEventListener("mousemove", moveCallback);
            console.log('The pointer lock status is now locked');
            mouseLockBool = true;
        } else {
            canvas.removeEventListener("mousemove", moveCallback);
            console.log('The pointer lock status is now unlocked');
            mouseLockBool = false;
        }
    };

    moveCallback = function (e) {
        mouseState.action = mouseState.actionChoice.TUMBLE;

        mouseState.delx = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        mouseState.dely = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

        camera.motion();
        //console.log(mouseState.delx + " " + mouseState.dely);
    };

    document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock;
    document.exitPointerLock();

    canvas.onclick = function () {
        if (!mouseLockBool) {
            canvas.requestPointerLock = canvas.requestPointerLock ||
                    canvas.mozRequestPointerLock ||
                    canvas.webkitRequestPointerLock;

            canvas.requestPointerLock();
        } else {
            fired = true;
            camera.fire(currentRoom);
        }
    };

    document.addEventListener('pointerlockchange', changeCallback);
    document.addEventListener('mozpointerlockchange', changeCallback);
    document.addEventListener('webkitpointerlockchange', changeCallback);

}
//(Dolan)
//To make animation work with multiple keys being pressed at once,
//the key event handlers instead change a boolean, which is checked
//every frame.

function setKeyEventHandler() {
    window.onkeydown = function (e) {
        var c = String.fromCharCode(e.keyCode);
        //camera.keyAction(c);
      //  document.getElementById("keypress").innerHTML = "<b>Key pressed:</b> " + c + "<br>";
        if (c === "w" || c === "W") {
            forW = true;
            //console.log("forW true");
        } else if (c === "s" || c === "S") {
            bacS = true;
            //console.log("bacS true");
        } else if (c === "a" || c === "A") {
            lefA = true;
            //console.log("lefA true");
        } else if (c === "d" || c === "D") {
            rigD = true;
            //console.log("rigD true");
        } else if (e.keyCode === 16) {
            shifRun = true;
            //console.log("running!");
        }
    };

    window.onkeyup = function (e) {
        var c = String.fromCharCode(e.keyCode);
        //camera.keyAction(c);
      //  document.getElementById("keypress").innerHTML = "<b>Key pressed:</b> " + c + "<br>";
        if (c === "w" || c === "W") {
            forW = false;
            //console.log("forW false");
        } else if (c === "s" || c === "S") {
            bacS = false;
            //console.log("bacS false");
        } else if (c === "a" || c === "A") {
            lefA = false;
            //console.log("lefA false");
        } else if (c === "d" || c === "D") {
            rigD = false;
            //console.log("rigD false");
        } else if (e.keyCode === 16) {
            shifRun = false;
            //console.log("walking?");
        }
    };

}
