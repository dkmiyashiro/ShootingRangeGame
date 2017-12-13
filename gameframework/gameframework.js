/* global song1 */

var t = new Timer();

window.onload = function init(){

    document.getElementById("pauseButton").style.display = "none";

    document.getElementById("startButton").onclick = function () {
        t.start();
        document.getElementById("startButton").style.display = "none";
        document.getElementById("pauseButton").style.display = "block";
    };

    document.getElementById("pauseButton").onclick = function () {
        t.pause();
        document.getElementById("startButton").style.display = "block";
        document.getElementById("pauseButton").style.display = "none";
    };


    document.getElementById("resetButton").onclick = function () {
        t.reset();
        document.getElementById("startButton").style.display = "block";
        document.getElementById("pauseButton").style.display = "none";
    };

    window.onkeydown = function (event) {
        var c = String.fromCharCode(event.keyCode);
        document.getElementById("keypressResult").innerHTML = c;
        score(c);
    };

};
