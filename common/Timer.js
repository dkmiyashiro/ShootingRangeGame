//This was just a small thing I made to supplement
//something that I feel should already be in a
//library or something.

//It's a timer based off of iteration (it calls itself 100 times per second)
//and changes its ms, seconds, and minutes values accordingly.

var timeKeeper;

function Timer(arr) {
    this.ms = 0;
    this.s = 0;
    this.m = 0;
    this.on = false;
    this.total = 0;

    this.timeChecks = arr;
    this.timeChecksi = 0;
    this.timeIncrement = false;


    this.renderWindow = false;
}

Timer.prototype.displayTeem = function () {
    var mm;
    var ss;
    var mmss;
    if (this.ms < 10) {
        mmss = "0" + this.ms;
    } else if(this.ms===100){
        mmss="00";
    } else {
        mmss = this.ms;
    }
    if (this.s < 10) {
        ss = "0" + this.s;
    } else if (this.s ===60){
        ss="00";
    } else {
        ss = this.s;
    }
    if (this.m < 10) {
        mm = "0" + this.m;
    } else {
        mm = this.m;
    }
    message = mm + ':' + ss + ':' + mmss;
    return message;
};


Timer.prototype.reset = function () {
    clearInterval(timeKeeper);
    this.ms = 0;
    this.s = 0;
    this.m = 0;
    this.on = false;
    document.getElementById("currenttime").innerHTML = this.displayTeem();
};

Timer.prototype.start = function () {
    if(!this.on){
    this.on = true;
    timeKeeper = setInterval(this.activate.bind(this), 10);
    }
};

Timer.prototype.pause = function () {
    clearInterval(timeKeeper);
    this.on = false;
    document.getElementById("currenttime").innerHTML = this.displayTeem();
};

Timer.prototype.activate = function () {
    if (this.ms < 100) {
        this.ms += 1;
    } else if (this.ms === 100) {
        if (this.s < 60) {
            this.s += 1;
        } else if (this.s === 60) {
            this.m += 1;
            this.s = 0;
        }
        this.ms = 0;
    }
    this.total += 1;
    document.getElementById("currenttime").innerHTML = this.displayTeem();
};

Timer.prototype.pressCheck = function(){
    if(this.total >= this.timeChecks[this.timeChecksi]-100 && this.total <= this.timeChecks[this.timeChecksi]+100){
        this.renderWindow = true;
        this.timeIncrement = true;
    } else {
        if(this.timeIncrement){
            this.timeIncrement = false;
            this.timeChecksi+=1;
        }
        this.renderWindow = false;
    }
};
